import { ProfilesActionType, ProfilesAccountDeletedAction } from 'store/profiles/actionsTypes';
import { AuthActionType, AuthAnyAction } from './actionsTypes';
import { authInitialState } from './initialState';

export const authReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = authInitialState,
  action: AuthAnyAction | ProfilesAccountDeletedAction,
) => {
  switch (action.type) {
    case AuthActionType.AuthStartedLoading:
      return {
        ...state,
        loading: true,
      };
    case AuthActionType.RegisterSuccess:
    case AuthActionType.LoginSuccess:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        loading: false,
      };
    case AuthActionType.RegisterFail:
    case AuthActionType.AuthError:
    case AuthActionType.LoginFail:
    case AuthActionType.Logout:
    case ProfilesActionType.AccountDeleted:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case AuthActionType.UserLoaded:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.user,
      };
    default:
      return state;
  }
};
