import { User } from './types';

export enum AuthActionType {
  // register / login / logout / loadUser started
  AuthStartedLoading = 'AUTH_STARTED_LOADING',

  RegisterSuccess = 'REGISTER_SUCCESS',
  RegisterFail = 'REGISTER_FAIL',

  LoginSuccess = 'LOGIN_SUCCESS',
  LoginFail = 'LOGIN_FAIL',

  UserLoaded = 'USER_LOADED',
  AuthError = 'AUTH_ERROR',

  Logout = 'LOGOUT',
}

export type AuthAuthStartedLoadingAction = {
  type: AuthActionType.AuthStartedLoading;
};

export type AuthRegisterSuccessAction = {
  type: AuthActionType.RegisterSuccess;
  token: string;
};

export type AuthRegisterFailAction = {
  type: AuthActionType.RegisterFail;
};

export type AuthLoginSuccessAction = {
  type: AuthActionType.LoginSuccess;
  token: string;
};

export type AuthLoginFailAction = {
  type: AuthActionType.LoginFail;
};

export type AuthUserLoadedAction = {
  type: AuthActionType.UserLoaded;
  user: User;
};

export type AuthAuthErrorAction = {
  type: AuthActionType.AuthError;
};

export type AuthLogoutAction = {
  type: AuthActionType.Logout;
};

export type AuthAnyAction =
  | AuthAuthStartedLoadingAction
  | AuthRegisterSuccessAction
  | AuthRegisterFailAction
  | AuthLoginSuccessAction
  | AuthLoginFailAction
  | AuthUserLoadedAction
  | AuthAuthErrorAction
  | AuthLogoutAction;
