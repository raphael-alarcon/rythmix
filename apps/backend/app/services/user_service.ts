import User from '#models/user'

export default class UserService {
  all() {
    return User.all()
  }

  create(data: Partial<User>) {
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
