/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import {middleware} from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const SpotifyAuthController = () => import('#controllers/spotify_auth_controller')
const TestController = () => import('#controllers/tests_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth())
    router.get('/me', [AuthController, 'me']).as('me').use(middleware.auth())
  })
  .prefix('auth')
  .as('auth')

router
  .group(() => {
    router.get('redirect', [SpotifyAuthController, 'redirect']).as('redirect')
    router.get('callback', [SpotifyAuthController, 'callback']).as('callback')
  })
  .prefix('spotify')
  .as('spotify')

router.get('test', [TestController]).as('test')

router.resource('users', UsersController).apiOnly()
