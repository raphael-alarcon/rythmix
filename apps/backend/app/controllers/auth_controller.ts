import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import UserDto from '#dtos/user'

import { loginValidator } from '#validators/auth'

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    response.ok(new UserDto(user))
  }

  async me({ auth, response }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()
    return new UserDto(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok({ message: 'Logged out' })
  }
}
