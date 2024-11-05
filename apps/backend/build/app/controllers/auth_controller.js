import User from '#models/user';
import { UserDto } from '../dtos/user_dto.js';
export default class AuthController {
    async redirect({ ally }) {
        return ally.use('spotify').redirect();
    }
    async callback({ ally, session, auth, response }) {
        const spotify = ally.use('spotify');
        if (spotify.accessDenied()) {
            session.flash('flash', 'Access was denied');
        }
        if (spotify.stateMisMatch()) {
            session.flash('flash', 'Request expired. Retry again');
        }
        if (spotify.hasError()) {
            session.flash('flash', spotify.getError() || 'Something went wrong');
        }
        const { emailVerificationState, token, original, ...spotifyUser } = await spotify.user();
        const user = await User.updateOrCreate({
            email: spotifyUser.email,
        }, {
            ...spotifyUser,
            isVerified: false,
            token,
        });
        await auth.use('web').login(user);
        session.flash('flash', 'Successfully authenticated');
        response.ok({ message: 'Successfully authenticated' });
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        response.ok({ message: 'Successfully disconnected' });
    }
    async me({ auth }) {
        await auth.authenticate();
        const user = auth.getUserOrFail();
        return new UserDto(user).toJson();
    }
}
//# sourceMappingURL=auth_controller.js.map