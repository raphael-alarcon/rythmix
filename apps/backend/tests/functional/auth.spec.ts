import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Auth', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Should not be able to register with an already existing email', async ({ client }) => {
    const response = await client.post('/users').fields({
      username: 'test',
      email: 'test@test.com',
      password: 'Test123*',
      confirmPassword: 'Test123*',
    })
    response.assertStatus(200)

    const response2 = await client.post('/users').fields({
      username: 'test',
      email: 'test@test.com',
      password: 'Test123*',
      confirmPassword: 'Test123*',
    })

    response2.assertStatus(422)
  })
})
