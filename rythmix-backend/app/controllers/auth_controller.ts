import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  public async redirect({ ally }: HttpContext) {
    return ally.use('spotify')
  }

  public async callback({ ally, session, auth }: HttpContext) {
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
    logger.info(`[${user.email}] auth success`)
  }

  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.flash('flash', 'Successfully disconnected')
    response.clearCookie('spotify_oauth_state')
    logger.info(`[${auth.user?.email}] disconnected successfully`)
  }

  async me({ auth, response }: HttpContext) {
    await auth.authenticate()
    response.ok(auth.user)
  }
}
