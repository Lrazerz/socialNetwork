export type User = {
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
  isAuthenticated: boolean; // todo or what? dub token
  loading: boolean;
  user?: User;
};
