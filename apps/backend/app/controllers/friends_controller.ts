import type { HttpContext } from '@adonisjs/core/http'

export default class FriendsController {
  async addFriend({ params }: HttpContext) {
    return
  }

  async removeFriend({ params }: HttpContext) {
    return params
  }
}
