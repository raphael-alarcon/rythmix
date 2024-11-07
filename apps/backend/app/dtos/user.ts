import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'
import SpotifyAccountDto from '#dtos/spotify_account'

export default class UserDto extends BaseModelDto {
  declare id: string
  declare email: string
  declare username: string
  declare profile: SpotifyAccountDto | null
  declare createdAt: string
  declare updatedAt: string

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.profile = user.profile && new SpotifyAccountDto(user.profile)
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt.toISO()!
  }
}
