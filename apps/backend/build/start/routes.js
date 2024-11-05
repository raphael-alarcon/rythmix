import router from '@adonisjs/core/services/router';
const AuthController = () => import('#controllers/auth_controller');
router.get('/', async () => {
    return {
        hello: 'world',
    };
});
router.group(() => {
    router.get('/redirect', [AuthController, 'redirect']).as('redirect');
    router.get('/callback', [AuthController, 'callback']).as('callback');
    router.get('/logout', [AuthController, 'logout']).as('logout');
    router.get('/me', [AuthController, 'me']).as('me');
}).prefix('auth').as('auth');
//# sourceMappingURL=routes.js.map