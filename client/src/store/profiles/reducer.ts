import { ProfilesAnyAction, ProfilesActionType } from './actionsTypes';
import { profilesInitialState } from './initialState';

// eslint-disable-next-line @typescript-eslint/default-param-last
export const profilesReducer = (state = profilesInitialState, action: ProfilesAnyAction) => {
  switch (action.type) {
    case ProfilesActionType.ProfileStartedLoading:
      return {
        ...state,
        loading: true,
      };
    case ProfilesActionType.ProfileLoaded:
    case ProfilesActionType.ProfileUpdated:
      return {
        ...state,
        profile: action.profile,
        loading: false,
      };
    case ProfilesActionType.ProfilesLoaded:
      return {
        ...state,
        profiles: action.profiles,
        loading: false,
      };
    case ProfilesActionType.ProfileError:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ProfilesActionType.ProfileClear:
      return profilesInitialState;
    case ProfilesActionType.ReposLoaded:
      return {
        ...state,
        repos: action.repos,
        loading: false,
      };
    default:
      return state;
  }
};
