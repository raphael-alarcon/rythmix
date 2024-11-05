import type { MakeTuyauResponse } from '@tuyau/utils/types'

type AuthRedirectGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['redirect']>
}
type AuthCallbackGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['callback']>
}
type AuthLogoutGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['logout']>
}
type AuthMeGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['me']>
}
export interface ApiDefinition {
  auth: {
    redirect: {
      $url: {}
      $get: AuthRedirectGetHead
      $head: AuthRedirectGetHead
    }
    callback: {
      $url: {}
      $get: AuthCallbackGetHead
      $head: AuthCallbackGetHead
    }
    logout: {
      $url: {}
      $get: AuthLogoutGetHead
      $head: AuthLogoutGetHead
    }
    me: {
      $url: {}
      $get: AuthMeGetHead
      $head: AuthMeGetHead
    }
  }
}
const routes = [
  {
    params: [],
    name: 'auth.redirect',
    path: '/auth/redirect',
    method: ['GET', 'HEAD'],
    types: {} as AuthRedirectGetHead,
  },
  {
    params: [],
    name: 'auth.callback',
    path: '/auth/callback',
    method: ['GET', 'HEAD'],
    types: {} as AuthCallbackGetHead,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/auth/logout',
    method: ['GET', 'HEAD'],
    types: {} as AuthLogoutGetHead,
  },
  {
    params: [],
    name: 'auth.me',
    path: '/auth/me',
    method: ['GET', 'HEAD'],
    types: {} as AuthMeGetHead,
  },
] as const
export const api = {
  routes,
  definition: {} as ApiDefinition,
}
