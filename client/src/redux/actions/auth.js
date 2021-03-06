import axios from 'axios';
import {setAlert} from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PROFILE_CLEAR, AUTH_STARTED_LOADING
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

const _authStartedLoading = () => {
  return {type: AUTH_STARTED_LOADING};
}

const _registerUserSuccess = (payload) => {
  return {type: REGISTER_SUCCESS, payload}
}

const _registerUserFail = () => {
  return {type: REGISTER_FAIL}
}

const _userLoaded = (user) => {
  return {type: USER_LOADED, user}
}

const _authError = () => {
  return {type: AUTH_ERROR}
}

const _loginUserSuccess = (token) => {
  return {type: LOGIN_SUCCESS, payload: {token}}
}

const _loginUserFail = () => {
  return {type: LOGIN_FAIL}
}

const _logoutUser = () => {
  return {type: LOGOUT}
}

const _clearProfile = () => {
  return {type: PROFILE_CLEAR}
}

// return user info

export const loadUser = () => {
  return async dispatch => {
    dispatch(_authStartedLoading());
    try {
      const res = await axios.get('/api/auth');
      dispatch(_userLoaded(res.data));
    } catch (e) {
      dispatch(_authError());
    }
  }
}

export const registerUser = (name, email, password) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({name, email, password});

    try {
      dispatch(_authStartedLoading());
      const res = await axios.post('/api/auth/signup', body, config);

      setAuthToken(res.data.token);
      dispatch(_registerUserSuccess(res.data));
      dispatch(loadUser());
    } catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_registerUserFail());
    }
  }
}

export const loginUser = (email, password) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({email, password});

    try {
      dispatch(_authStartedLoading());
      const res = await axios.post('/api/auth/signin', body, config);

      setAuthToken(res.data.token);
      dispatch(_loginUserSuccess(res.data.token));
      dispatch(loadUser());
    } catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_loginUserFail());
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(_authStartedLoading());
    dispatch(_clearProfile());
    dispatch(_logoutUser());
  }
}