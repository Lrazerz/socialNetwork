// to allow underscore _id
/* eslint-disable @typescript-eslint/naming-convention */

export type User = {
  _id: string;
  avatar: string;
  date: string;
  email: string;
  name: string;
  tokens: {
    _id: string;
    token: string;
    expDateSeconds: string;
  }[];
};

export type AuthState = {
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
};
