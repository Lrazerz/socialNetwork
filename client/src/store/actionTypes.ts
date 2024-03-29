export enum AuthActionType {
  RegisterSuccess = 'REGISTER_SUCCESS',
  RegisterFail = 'REGISTER_FAIL',

  LoginSuccess = 'LOGIN_SUCCESS',
  LoginFail = 'LOGIN_FAIL',
  Logout = 'LOGOUT',

  AuthStartedLoading = 'AUTH_STARTED_LOADING',
  UserLoaded = 'USER_LOADED',
  AuthError = 'AUTH_ERROR',
}

// Profiles
export const PROFILE_STARTED_LOADING = 'PROFILE_STARTED_LOADING';
export const PROFILE_LOADED = 'PROFILE_LOADED';
export const PROFILES_LOADED = 'PROFILES_LOADED';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const PROFILE_CLEAR = 'PROFILE_CLEAR';
export const PROFILE_UPDATED = 'PROFILE_UPDATED';

export const ACCOUTN_DELETED = 'ACCOUNT_DELETED';

export const REPOS_LOADED = 'REPOS_LOADED';

// Posts
export const POST_STARTED_LOADING = 'POST_STARTED_LOADING';
export const POSTS_LOADED = 'POSTS_LOADED';
export const POST_LOADED = 'POST_LOADED';
export const POSTS_ERROR = 'POSTS_ERROR';

export const LIKES_LOADED = 'LIKES_LOADED';

export const COMMENTS_LOADED = 'COMMENTS_LOADED';
