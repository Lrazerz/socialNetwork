import { authInitialState } from './auth';
import { profilesInitialState } from './profiles';
import { postsInitialState } from './posts';
import { alertsInitialState } from './alerts';

import { DevConnectorStore } from './types';

export const initialStoreState: DevConnectorStore = {
  auth: authInitialState,
  profiles: profilesInitialState,
  posts: postsInitialState,
  alerts: alertsInitialState,
};
