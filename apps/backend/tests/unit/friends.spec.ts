import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import app from '@adonisjs/core/services/app'
import { FriendService } from '#services/friends_service'

async function setup() {
  const friendService = await app.container.make(FriendService)
  const [user, friend] = await UserFactory.createMany(2)

  return { friendService, user, friend }
}

test.group('Friends', async (group) => {
  test('target user should receive pending invite', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.send(user.id, friend.id)
    const friendPendingRequests = await friendService.listRequestsByStatus(friend.id, 'pending')
    const userPendingRequests = await friendService.listRequestsByStatus(user.id, 'pending')

    // THEN
    assert.exists(userPendingRequests.find((u) => u.id === friend.id))
    assert.exists(friendPendingRequests.find((u) => u.id === user.id))
    assert.notExists(userPendingRequests.find((u) => u.$extras.pivot_status !== 'pending'))
    assert.notExists(friendPendingRequests.find((u) => u.$extras.pivot_status !== 'pending'))
  })

  test('should accept friend request', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.send(user.id, friend.id)
    await friendService.accept(friend.id, user.id)

    // THEN
    const friends = await friendService.friends(user.id)
    const friendFriends = await friendService.friends(friend.id)

    const friendPendingRequests = await friendService.listRequestsByStatus(friend.id, 'pending')
    const userPendingRequests = await friendService.listRequestsByStatus(user.id, 'pending')

    assert.exists(friends.find((u) => u.id === friend.id))
    assert.exists(friendFriends.find((u) => u.id === user.id))

    assert.notExists(userPendingRequests.find((u) => u.id === friend.id))
    assert.notExists(friendPendingRequests.find((u) => u.id === user.id))
  })

  test('should reject friend request', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.send(user.id, friend.id)
    await friendService.reject(friend.id, user.id)

    // THEN
    const friendPendingRequests = await friendService.listRequestsByStatus(friend.id, 'rejected')
    const userPendingRequests = await friendService.listRequestsByStatus(user.id, 'rejected')

    assert.exists(friendPendingRequests.find((u) => u.id === user.id))
    assert.exists(userPendingRequests.find((u) => u.id === friend.id))
  })

  test('should list requests by status', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.send(user.id, friend.id)
    let pendingRequests = await friendService.listRequestsByStatus(user.id, 'pending')

    assert.isNotEmpty(pendingRequests)

    await friendService.accept(friend.id, user.id)
    pendingRequests = await friendService.listRequestsByStatus(user.id, 'pending')
    const acceptedRequests = await friendService.listRequestsByStatus(user.id, 'accepted')

    // THEN
    assert.isEmpty(pendingRequests)
    assert.isNotEmpty(acceptedRequests)
  })

  test('should remove friend', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.send(user.id, friend.id)
    await friendService.accept(friend.id, user.id)
    await friendService.remove(user.id, friend.id)

    // THEN
    const friends = await friendService.friends(user.id)
    const friendFriends = await friendService.friends(friend.id)

    assert.isEmpty(friends)
    assert.isEmpty(friendFriends)
  })
})
