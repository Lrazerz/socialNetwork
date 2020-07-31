import {combineReducers} from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import profileReducer from './profile';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
})