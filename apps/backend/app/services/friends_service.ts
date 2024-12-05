import User from '#models/user'

export class FriendService {
  async friends(userId: number) {
    return await this.listRequestsByStatus(userId, 'accepted')
  }

  async send(userId: number, friendId: number) {
    const [user, friend] = await User.findMany([userId, friendId])
    await user.related('friends').attach({
      [friend.id]: {
        sender: true,
      },
    })
    await friend.related('friends').attach([user.id])
  }

  async remove(userId: number, friendId: number) {
    const [user, friend] = await User.findMany([userId, friendId])

    await user.related('friends').detach([friend.id])
    await friend.related('friends').detach([user.id])
  }

  async reject(userId: number, friendId: number) {
    const [user, friend] = await User.findMany([userId, friendId])

    await user.related('friends').sync({
      [friend.id]: {
        status: 'rejected',
      },
    })
    await friend.related('friends').sync({
      [user.id]: {
        status: 'rejected',
      },
    })
  }

  async accept(userId: number, friendId: number) {
    const [user, friend] = await User.findMany([userId, friendId])

    await user.related('friends').sync({
      [friend.id]: {
        status: 'accepted',
      },
    })
    await friend.related('friends').sync({
      [user.id]: {
        status: 'accepted',
      },
    })
  }

  async findRequest(userId: number, friendId: number) {
    const [user, friend] = await User.findMany([userId, friendId])
    if (!user || !friend) {
      throw new Error('User not found')
    }
    return await user
      .related('friends')
      .query()
      .where('friend_id', friend.id)
      .pivotColumns(['status', 'sender'])
      .wherePivot('friend_id', friend.id)
      .first()
  }

  async listRequestsByStatus(userId: number, status: 'pending' | 'accepted' | 'rejected') {
    const user = await User.findOrFail(userId)
    return user
      .related('friends')
      .query()
      .pivotColumns(['status', 'sender'])
      .wherePivot('status', status)
  }
}
