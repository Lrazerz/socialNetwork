import { ApiRequestError } from '../common/types';
import { Profile, GithubRepo } from './types';

export enum ProfilesActionType {
  ProfileStartedLoading = 'PROFILE_STARTED_LOADING',

  ProfileLoaded = 'PROFILE_LOADED',
  ProfileUpdated = 'PROFILE_UPDATED',
  ProfileError = 'PROFILE_ERROR',
  ProfileClear = 'PROFILE_CLEAR',

  ProfilesLoaded = 'PROFILES_LOADED',

  AccountDeleted = 'ACCOUNT_DELETED',

  ReposLoaded = 'REPOS_LOADED',
}

export type ProfilesProfileStartedLoadingAction = {
  type: ProfilesActionType.ProfileStartedLoading;
};

export type ProfilesProfileLoadedAction = {
  type: ProfilesActionType.ProfileLoaded;
  profile: Profile;
};

export type ProfilesProfileUpdatedAction = {
  type: ProfilesActionType.ProfileUpdated;
  profile: Profile;
};

export type ProfilesProfileErrorAction = {
  type: ProfilesActionType.ProfileError;
  error: ApiRequestError;
};

export type ProfilesProfileClearAction = {
  type: ProfilesActionType.ProfileClear;
};

export type ProfilesProfilesLoadedAction = {
  type: ProfilesActionType.ProfilesLoaded;
  profiles: Profile[];
};

export type ProfilesAccountDeletedAction = {
  type: ProfilesActionType.AccountDeleted;
};

export type ProfilesReposLoadedAction = {
  type: ProfilesActionType.ReposLoaded;
  repos: GithubRepo[];
};

export type ProfilesAnyAction =
  | ProfilesProfileStartedLoadingAction
  | ProfilesProfileLoadedAction
  | ProfilesProfileUpdatedAction
  | ProfilesProfileErrorAction
  | ProfilesProfileClearAction
  | ProfilesProfilesLoadedAction
  | ProfilesAccountDeletedAction
  | ProfilesReposLoadedAction;
