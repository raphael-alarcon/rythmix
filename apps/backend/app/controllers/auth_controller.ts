import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { UserDto } from '../dtos/user_dto.js'

export default class AuthController {
  public async redirect({ ally }: HttpContext) {
    return await ally.use('spotify').redirect()
  }

  public async callback({ ally, session, auth, response }: HttpContext) {
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
    const user = await User.updateOrCreate(
      {
        email: spotifyUser.email,
      },
      {
        ...spotifyUser,
        isVerified: false,
        token,
      }
    )

    await auth.use('web').login(user)
    session.flash('flash', 'Successfully authenticated')
    response.redirect().toPath("http://localhost:3000")
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.ok({ message: 'Successfully disconnected' })
  }

  async me({ auth }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()

    return new UserDto(user).toJson()
  }
}
