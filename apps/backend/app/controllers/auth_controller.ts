import User from '#models/user'
import { loginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'
import { UserDto } from '../dtos/user_dto.js';

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    response.ok(new UserDto(user).toJson())
  }

  async me({ auth, response }: HttpContext) {
    await auth.use('web').authenticate()
    const user = auth.getUserOrFail()
    response.ok(new UserDto(user).toJson())
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok({ message: 'Logged out' })
  }
}
