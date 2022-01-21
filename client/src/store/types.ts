import { AuthState } from './auth/types';
import { ProfilesState } from './profiles/types';
import { PostsState } from './posts/types';
import { AlertsState } from './alerts/types';

export type DevConnectorStore = {
  auth: AuthState;
  profiles: ProfilesState;
  posts: PostsState;
  alerts: AlertsState;
};
