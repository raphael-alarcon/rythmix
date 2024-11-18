import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import { InferInput } from '@vinejs/vine/types'

type AuthLoginPost = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/auth.ts'))['loginValidator']>
  >
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['login']>
}
type AuthLogoutPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['logout']>
}
type AuthMeGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['me']>
}
type SpotifyRedirectGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/spotify_auth_controller.ts').default['redirect']
  >
}
type SpotifyCallbackGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/spotify_auth_controller.ts').default['callback']
  >
}
type UsersGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/users_controller.ts').default['index']>
}
type UsersPost = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/auth.ts'))['registerValidator']>
  >
  response: MakeTuyauResponse<import('../app/controllers/users_controller.ts').default['store']>
}
type UsersIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/users_controller.ts').default['show']>
}
type UsersIdPutPatch = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/users_controller.ts').default['update']>
}
type UsersIdDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/users_controller.ts').default['destroy']>
}

export interface ApiDefinition {
  auth: {
    login: {
      $url: {}
      $post: AuthLoginPost
    }
    logout: {
      $url: {}
      $post: AuthLogoutPost
    }
    me: {
      $url: {}
      $get: AuthMeGetHead
      $head: AuthMeGetHead
    }
  }
  spotify: {
    redirect: {
      $url: {}
      $get: SpotifyRedirectGetHead
      $head: SpotifyRedirectGetHead
    }
    callback: {
      $url: {}
      $get: SpotifyCallbackGetHead
      $head: SpotifyCallbackGetHead
    }
  }
  users: {
    '$url': {}
    '$get': UsersGetHead
    '$head': UsersGetHead
    '$post': UsersPost
    ':id': {
      $url: {}
      $get: UsersIdGetHead
      $head: UsersIdGetHead
      $put: UsersIdPutPatch
      $patch: UsersIdPutPatch
      $delete: UsersIdDelete
    }
  }
}

const routes = [
  {
    params: [],
    name: 'auth.login',
    path: '/auth/login',
    method: ['POST'],
    types: {} as AuthLoginPost,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/auth/logout',
    method: ['POST'],
    types: {} as AuthLogoutPost,
  },
  {
    params: [],
    name: 'auth.me',
    path: '/auth/me',
    method: ['GET', 'HEAD'],
    types: {} as AuthMeGetHead,
  },
  {
    params: [],
    name: 'spotify.redirect',
    path: '/spotify/redirect',
    method: ['GET', 'HEAD'],
    types: {} as SpotifyRedirectGetHead,
  },
  {
    params: [],
    name: 'spotify.callback',
    path: '/spotify/callback',
    method: ['GET', 'HEAD'],
    types: {} as SpotifyCallbackGetHead,
  },
  {
    params: [],
    name: 'users.index',
    path: '/users',
    method: ['GET', 'HEAD'],
    types: {} as UsersGetHead,
  },
  {
    params: [],
    name: 'users.store',
    path: '/users',
    method: ['POST'],
    types: {} as UsersPost,
  },
  {
    params: ['id'],
    name: 'users.show',
    path: '/users/:id',
    method: ['GET', 'HEAD'],
    types: {} as UsersIdGetHead,
  },
  {
    params: ['id'],
    name: 'users.update',
    path: '/users/:id',
    method: ['PUT', 'PATCH'],
    types: {} as UsersIdPutPatch,
  },
  {
    params: ['id'],
    name: 'users.destroy',
    path: '/users/:id',
    method: ['DELETE'],
    types: {} as UsersIdDelete,
  },
] as const
export const api = {
  routes,
  definition: {} as ApiDefinition,
}
