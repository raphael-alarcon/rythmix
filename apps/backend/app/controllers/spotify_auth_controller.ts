import type { HttpContext } from '@adonisjs/core/http'
import SpotifyAccount from '#models/spotify_account'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import User from '#models/user'

@inject()
export default class SpotifyAuthController {
  constructor(private userService: UserService) {}

  public async redirect({ ally }: HttpContext) {
    return await ally.use('spotify').redirect()
  }

  public async callback({ ally, session }: HttpContext) {
    const spotify = ally.use('spotify')
    if (spotify.accessDenied()) {
      session.flash('flash', 'Access was denied')
    }

    if (spotify.stateMisMatch()) {
      session.flash('flash', 'Request expired. Retry again')
    }

    if (spotify.hasError()) {
      session.flash('flash', spotify.getError() || 'Something went wrong')
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
      session.flash('flash', 'User not found')
      userOwningSpotifyAccount = await User.create({
        email: spotifyUser.email,
        username: spotifyUser.nickName,
        password: crypto.randomUUID(),
      })
    }

    await userOwningSpotifyAccount.related('profile').save(spotifyAccount)

    return User.accessTokens.create(userOwningSpotifyAccount)
  }
}
