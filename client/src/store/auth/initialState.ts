import { AuthState } from './types';

export const authInitialState: AuthState = {
  token: undefined,
  isAuthenticated: false,
  loading: false,
  user: false,
};
