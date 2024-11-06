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

router.group(() => {

  router.post('/login', [AuthController, 'login']).as('login')
  router.post('/logout', [AuthController, 'logout']).as('logout')
  router.post('/register', [UsersController, 'store']).as('register')
  router.get('/me', [AuthController, 'me']).as('me')

  // router.get('/redirect', [AuthController, 'redirect']).as('redirect')
  // router.get('/callback', [AuthController, 'callback']).as('callback')
}).prefix('auth').as('auth')
