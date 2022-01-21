import { ProfilesState } from './types';

export const profilesInitialState: ProfilesState = {
  profiles: [],
  profile: undefined,
  repos: [],
  loading: false,
  error: undefined,
};
