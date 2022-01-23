import axios, { AxiosError } from 'axios';

import setAuthToken from 'utils/setAuthToken';
import { ProfilesActionType } from 'store/profiles/actionsTypes';
import { ApiRequestError, DevConnectorThunkDispatch } from 'store/common/types';

import { setAlert } from '../alerts/actions';
import {
  AuthActionType,
  AuthAuthErrorAction,
  AuthAuthStartedLoadingAction,
  AuthLoginFailAction,
  AuthLoginSuccessAction,
  AuthLogoutAction,
  AuthRegisterFailAction,
  AuthRegisterSuccessAction,
  AuthUserLoadedAction,
} from './actionsTypes';
import { User } from './types';

const _authStartedLoading = (): AuthAuthStartedLoadingAction => {
  return { type: AuthActionType.AuthStartedLoading };
};

const _registerUserSuccess = (token: string): AuthRegisterSuccessAction => {
  return { type: AuthActionType.RegisterSuccess, token };
};

const _registerUserFail = (): AuthRegisterFailAction => {
  return { type: AuthActionType.RegisterFail };
};

const _userLoaded = (user: User): AuthUserLoadedAction => {
  return { type: AuthActionType.UserLoaded, user };
};

const _authError = (): AuthAuthErrorAction => {
  return { type: AuthActionType.AuthError };
};

const _loginUserSuccess = (token: string): AuthLoginSuccessAction => {
  return { type: AuthActionType.LoginSuccess, token };
};

const _loginUserFail = (): AuthLoginFailAction => {
  return { type: AuthActionType.LoginFail };
};

const _logoutUser = (): AuthLogoutAction => {
  return { type: AuthActionType.Logout };
};

const _clearProfile = () => {
  return { type: ProfilesActionType.ProfileClear };
};

export const loadUser = () => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    dispatch(_authStartedLoading());
    try {
      const { data } = await axios.get<User>('/api/auth');
      dispatch(_userLoaded(data));
    } catch (e) {
      dispatch(_authError());
    }
  };
};

export const registerUser = (name: string, email: string, password: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      dispatch(_authStartedLoading());
      const { data } = await axios.post<{ token: string }>('/api/auth/signup', body, config);

      setAuthToken(data.token);
      dispatch(_registerUserSuccess(data.token));
      dispatch(loadUser()).catch(null);
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<ApiRequestError[], unknown>)?.response?.data;

        if (data && data?.length) {
          data.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(_registerUserFail());
      }
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      dispatch(_authStartedLoading());
      const { data } = await axios.post<{ token: string }>('/api/auth/signin', body, config);

      setAuthToken(data.token);
      dispatch(_loginUserSuccess(data.token));
      dispatch(loadUser()).catch(null);
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<ApiRequestError[], unknown>)?.response?.data;

        if (data && data?.length) {
          data.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(_loginUserFail());
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    dispatch(_authStartedLoading());
    dispatch(_clearProfile());
    dispatch(_logoutUser());
  };
};
