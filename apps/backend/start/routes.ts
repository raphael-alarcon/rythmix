/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/logout', [AuthController, 'logout']).as('logout')
    router.get('/me', [AuthController, 'me']).as('me')
  })
  .prefix('auth')
  .as('auth')

router.resource('users', UsersController).apiOnly()
