import {
  PROFILE_CLEAR,
  PROFILE_ERROR,
  PROFILE_LOADED, PROFILE_STARTED_LOADING,
  PROFILE_UPDATED,
  PROFILES_LOADED,
  REPOS_LOADED
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_STARTED_LOADING:
      return {
        ...state,
        loading: true
      }
    case PROFILE_LOADED:
    case PROFILE_UPDATED:
      return {
        ...state,
        profile: action.profile,
        loading: false
      }
    case PROFILES_LOADED:
      return {
        ...state,
        profiles: action.profiles,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case PROFILE_CLEAR:
      return initialState;
    case REPOS_LOADED:
      return {
        ...state,
        repos: action.repos,
        loading: false
      }
    default:
      return state;
  }
}