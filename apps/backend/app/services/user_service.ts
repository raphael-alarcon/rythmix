import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { registerValidator } from '#validators/auth'
import SpotifyAccount from '#models/spotify_account'

type RegisterParams = Infer<typeof registerValidator>

export default class UserService {
  async all() {
    const users = await User.all()
    console.log(users)
    return users
  }

  create(data: RegisterParams) {
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

  async getUserOwningSpotifyAccount(spotifyAccount: SpotifyAccount) {
    const user = await User.find(spotifyAccount.userId || null)
    console.log(user)
    return user
  }
}
