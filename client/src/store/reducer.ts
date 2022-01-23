import { combineReducers } from 'redux';
import { alertsReducer } from './alerts';
import { authReducer } from './auth';
import { profilesReducer } from './profiles';
import { postsReducer } from './posts';

export default combineReducers({
  alerts: alertsReducer,
  auth: authReducer,
  profiles: profilesReducer,
  posts: postsReducer,
});
