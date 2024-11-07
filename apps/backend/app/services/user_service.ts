import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { registerValidator } from '#validators/auth'

type RegisterParams = {
  data: Infer<typeof registerValidator>
}

export default class UserService {
  all() {
    return User.all()
  }

  create({ data }: RegisterParams) {
    return User.create(data)
  }

  find(id: number) {
    return User.findOrFail(id)
  }

  findByEmail(email: string) {
    return User.findBy('email', email)
  }

  update(user: User, data: User) {
    user.merge(data)
    return user.save()
  }
}
