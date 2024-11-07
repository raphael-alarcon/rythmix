import { BaseModelDto } from '@adocasts.com/dto/base'
import SpotifyAccount from '#models/spotify_account'
import { SpotifyToken } from '@adonisjs/ally/types'

export default class SpotifyAccountDto extends BaseModelDto {
  declare id: string
  declare avatarUrl: string
  declare nickName: string
  declare email: string
  declare token: SpotifyToken
  declare createdAt: string
  declare updatedAt: string

  constructor(spotifyAccount?: SpotifyAccount) {
    super()

    if (!spotifyAccount) return
    this.id = spotifyAccount.id
    this.avatarUrl = spotifyAccount.avatarUrl
    this.nickName = spotifyAccount.nickName
    this.email = spotifyAccount.email
    this.token = spotifyAccount.token
    this.createdAt = spotifyAccount.createdAt.toISO()!
    this.updatedAt = spotifyAccount.updatedAt.toISO()!
  }
}
