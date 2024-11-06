import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

import type { SpotifyToken } from '@adonisjs/ally/types'

export default class SpotifyAccount extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: string

  @column()
  declare avatarUrl: string

  @column()
  declare nickName: string

  @column({ serializeAs: null })
  declare email: string

  @column({ serializeAs: null })
  declare token: SpotifyToken

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'createdAt',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'updatedAt',
  })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(user: SpotifyAccount) {
    user.id = crypto.randomUUID()
  }
}
