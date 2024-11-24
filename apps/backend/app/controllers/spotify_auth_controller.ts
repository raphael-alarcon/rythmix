import type { HttpContext } from '@adonisjs/core/http'
import SpotifyAccount from '#models/spotify_account'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import { spotifyRedirectValidator } from '#validators/spotify_auth'
import encryption from '@adonisjs/core/services/encryption'

interface State {
  appRedirectUri: string
}

@inject()
export default class SpotifyAuthController {
  constructor(private userService: UserService) {}

  public async redirect({ ally, request }: HttpContext) {
    const { appRedirectUri } = await request.validateUsing(spotifyRedirectValidator)
    const state: State = { appRedirectUri }

    const encodedState = encryption.encrypt(JSON.stringify(state))

    return await ally.use('spotify').redirect((redirectRequest) => {
      redirectRequest.param('state', encodedState)
    })
  }

  public async callback({ ally, request, response }: HttpContext) {
    const { state: encodedState } = request.all()

    const state: State | null = encryption.decrypt(encodedState)

    if (!state) {
      return response.badRequest('Invalid state')
    }

    const spotify = ally.use('spotify')
    if (spotify.accessDenied()) {
      response.abort('Access denied')
    }

    if (spotify.stateMisMatch()) {
      response.abort('Invalid state')
    }

    if (spotify.hasError()) {
      response.abort(spotify.getError() || 'Something went wrong')
    }

    const { emailVerificationState, token, original, ...spotifyUser } = await spotify.user()
    const spotifyAccount = await SpotifyAccount.updateOrCreate(
      {
        id: spotifyUser.id,
      },
      {
        ...spotifyUser,
        token,
      }
    )

    let userOwningSpotifyAccount =
      await this.userService.getUserOwningSpotifyAccount(spotifyAccount)

    if (!userOwningSpotifyAccount) {
      userOwningSpotifyAccount = await User.create({
        email: spotifyUser.email,
        username: spotifyUser.nickName,
        password: crypto.randomUUID(),
      })
    }

    await userOwningSpotifyAccount.related('profile').save(spotifyAccount)

    const userToken = User.accessTokens.create(userOwningSpotifyAccount)

    response.redirect().toPath(`${state.appRedirectUri}?token=${token.token}`)
  }
}
