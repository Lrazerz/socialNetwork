import axios, { AxiosError } from 'axios';
import { ApiRequestError, DevConnectorThunkDispatch } from 'store/common/types';
import { setAlert } from 'store/alerts/actions';

import {
  ProfilesAccountDeletedAction,
  ProfilesActionType,
  ProfilesProfileClearAction,
  ProfilesProfileErrorAction,
  ProfilesProfileLoadedAction,
  ProfilesProfilesLoadedAction,
  ProfilesProfileStartedLoadingAction,
  ProfilesProfileUpdatedAction,
  ProfilesReposLoadedAction,
} from './actionsTypes';
import { Profile, GithubRepo } from './types';

const _profileStartedLoading = (): ProfilesProfileStartedLoadingAction => {
  return { type: ProfilesActionType.ProfileStartedLoading };
};

const _profileLoaded = (profile: Profile): ProfilesProfileLoadedAction => {
  return { type: ProfilesActionType.ProfileLoaded, profile };
};

const _profileUpdate = (profile: Profile): ProfilesProfileUpdatedAction => {
  return { type: ProfilesActionType.ProfileUpdated, profile };
};

const _profileError = (error: ApiRequestError): ProfilesProfileErrorAction => {
  return { type: ProfilesActionType.ProfileError, error };
};

const _profileClear = (): ProfilesProfileClearAction => {
  return { type: ProfilesActionType.ProfileClear };
};

const _profilesLoaded = (profiles: Profile[]): ProfilesProfilesLoadedAction => {
  return { type: ProfilesActionType.ProfilesLoaded, profiles };
};

const _accountDeleted = (): ProfilesAccountDeletedAction => {
  return { type: ProfilesActionType.AccountDeleted };
};

const _reposLoaded = (repos: GithubRepo[]): ProfilesReposLoadedAction => {
  return { type: ProfilesActionType.ReposLoaded, repos };
};

export const getCurrentProfile = () => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());
      const { data } = await axios.get<Profile>('/api/profile/me');

      dispatch(_profileLoaded(data));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const getAllProfiles = () => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    dispatch(_profileClear());
    try {
      dispatch(_profileStartedLoading());
      const { data } = await axios.get<Profile[]>('/api/profile');

      dispatch(_profilesLoaded(data));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const getProfileById = (userId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());
      const { data } = await axios.get<Profile>(`/api/profile/user/${userId}`);

      dispatch(_profileLoaded(data));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const getGithubRepos = (username: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      const { data } = await axios.get<string>(`/api/profile/github/${username}`);

      console.log('githubRepos', data);
      dispatch(_reposLoaded(JSON.parse(data) as GithubRepo[]));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const createUpdateProfile = (formData: FormData, isCreating = true) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<Profile>('/api/profile', formData, config);

      dispatch(_profileLoaded(data));

      dispatch(setAlert(isCreating ? 'Profile Created' : 'Profile Updated', 'success'));

      if (isCreating) {
        // todo can pass the history from react-router-dom through component
        window.history.pushState({ page: 1 }, 'dashboard', '/dashboard');
        window.history.go();
      }
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const addExperience = (formData: FormData) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put<Profile>('/api/profile/experience', formData, config);

      dispatch(_profileUpdate(data));
      dispatch(setAlert('Experience Added', 'success'));

      // todo can pass the history from react-router-dom through component
      window.history.pushState({ page: 1 }, 'dashboard', '/dashboard');
      window.history.go();
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const addEducation = (formData: FormData) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put<Profile>('/api/profile/education', formData, config);

      dispatch(_profileUpdate(data));
      dispatch(setAlert('Education Added', 'success'));

      // todo can pass the history from react-router-dom through component
      window.history.pushState({ page: 1 }, 'dashboard', '/dashboard');
      window.history.go();
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

// todo all education/exp
export const deleteExperience = (experienceId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());

      const { data } = await axios.delete<Profile>(`/api/profile/experience/${experienceId}`);

      dispatch(_profileUpdate(data));

      dispatch(setAlert('Experience Removed', 'success'));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const deleteEducation = (educationId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_profileStartedLoading());

      const { data } = await axios.delete<Profile>(`/api/profile/education/${educationId}`);

      dispatch(_profileUpdate(data));

      dispatch(setAlert('Education Removed', 'success'));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        dispatch(
          _profileError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const deleteAccount = (educationId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        dispatch(_profileStartedLoading());
        await axios.delete(`/api/profile`);

        dispatch(_profileClear());
        dispatch(_accountDeleted());

        dispatch(setAlert('Your account has been permanently deleted', 'success'));
      } catch (e) {
        if ((e as { isAxiosError?: boolean })?.isAxiosError) {
          dispatch(
            _profileError({
              msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
              status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
            }),
          );
        }
      }
    }
  };
};
