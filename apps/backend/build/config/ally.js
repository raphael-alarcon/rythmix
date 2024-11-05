import env from '#start/env';
import { defineConfig, services } from '@adonisjs/ally';
const allyConfig = defineConfig({
    spotify: services.spotify({
        clientId: env.get('SPOTIFY_CLIENT_ID'),
        clientSecret: env.get('SPOTIFY_CLIENT_SECRET'),
        callbackUrl: `${env.get('APP_URL')}/auth/callback`,
        scopes: ['user-read-email', 'streaming'],
        showDialog: false,
    }),
});
export default allyConfig;
//# sourceMappingURL=ally.js.map