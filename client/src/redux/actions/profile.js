import axios from 'axios';
import {
  PROFILE_LOADED,
  PROFILE_ERROR,
  PROFILE_UPDATED,
  PROFILE_CLEAR,
  ACCOUTN_DELETED,
  PROFILES_LOADED,
  REPOS_LOADED
} from "./types";
import {setAlert} from './alert';

// todo always set loading: true in the start of action

const _profileLoaded = (profile) => {
  return {type: PROFILE_LOADED, profile};
}

const _profilesLoaded = (profiles) => {
  return {type: PROFILES_LOADED, profiles};
}

const _profileError = (msg, status) => {
  return {type: PROFILE_ERROR, payload: {msg, status}};
}

const _profileUpdate = (profile) => {
  return {type: PROFILE_UPDATED, profile};
}

const _profileClear = () => {
  return {type: PROFILE_CLEAR};
}

const _accountDeleted = () => {
  return {type: ACCOUTN_DELETED};
}

const _reposLoaded = (repos) => {
  return {type: REPOS_LOADED, repos};
}


// Get current users profile
export const getCurrentProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/profile/me');

      dispatch(_profileLoaded(res.data));

    } catch (e) {
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Get all profiles
export const getAllProfiles = () => {
  return async dispatch => {
    dispatch(_profileClear());
    try {
      const res = await axios.get('/api/profile');

      dispatch(_profilesLoaded(res.data));

    } catch (e) {
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Get profile by user ID
export const getProfileById = (userId) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch(_profileLoaded(res.data));

    } catch (e) {
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Get github repos
export const getGithubRepos = (username) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch(_profileLoaded(res.data));

    } catch (e) {
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Create or update profile
export const createUpdateProfile = (formData, edit = false) => {
  return async dispatch => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.post('/api/profile', formData, config);

      dispatch(_profileLoaded(res.data));

      dispatch(setAlert(edit === true ? 'Profile Updated' : 'Profile Created', 'success'));

      if (!edit) {
        // todo can pass the history from react-router-dom through component
        window.history.pushState({page: 1}, "dashboard", "/dashboard");
        window.history.go();
      }

    } catch (e) {
      const {errors = null} = e.response.data;
      if (errors) {
        console.log('erorrs');
        errors.forEach(err => {
          console.log('foreach err', err);
          dispatch(setAlert(err.msg, 'danger'));
        })
      }
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Add experience
export const addExperience = (formData) => {
  return async dispatch => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.put('/api/profile/experience', formData, config);

      dispatch(_profileUpdate(res.data));
      dispatch(setAlert('Experience Added', 'success'));

      // todo can pass the history from react-router-dom through component
      window.history.pushState({page: 1}, "dashboard", "/dashboard");
      window.history.go();

    } catch (e) {
      const {errors = null} = e.response.data;
      if (errors) {
        console.log('erorrs');
        errors.forEach(err => {
          console.log('foreach err', err);
          dispatch(setAlert(err.msg, 'danger'));
        })
      }
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Add education
export const addEducation = (formData) => {
  return async dispatch => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.put('/api/profile/education', formData, config);

      dispatch(_profileUpdate(res.data));
      dispatch(setAlert('Education Added', 'success'));

      // todo can pass the history from react-router-dom through component
      window.history.pushState({page: 1}, "dashboard", "/dashboard");
      window.history.go();

    } catch (e) {
      const {errors = null} = e.response.data;
      if (errors) {
        console.log('erorrs');
        errors.forEach(err => {
          console.log('foreach err', err);
          dispatch(setAlert(err.msg, 'danger'));
        })
      }
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Delete experience
export const deleteExperience = (experienceId) => {
  return async dispatch => {
    try {

      const res = await axios.delete(`/api/profile/experience/${experienceId}`);

      dispatch(_profileUpdate(res.data));

      dispatch(setAlert('Experience Removed', 'success'));

    } catch (e) {
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Delete education

export const deleteEducation = (educationId) => {
  return async dispatch => {
    try {

      const res = await axios.delete(`/api/profile/education/${educationId}`);

      dispatch(_profileUpdate(res.data));

      dispatch(setAlert('Education Removed', 'success'));
    } catch (e) {
      dispatch(_profileError(e.response.statusText, e.response.status));
    }
  }
}

// Delete account

export const deleteAccount = (educationId) => {
  return async dispatch => {

    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete(`/api/profile`);

        dispatch(_profileClear());
        dispatch(_accountDeleted());

        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (e) {
        dispatch(_profileError(e.response.statusText, e.response.status));
      }
    }
  }
}