import {SET_ALERT, REMOVE_ALERT} from "./types";
import {v4 as uuid4} from 'uuid';

const _setAlert = (alert) => {
  return {type: SET_ALERT, alert}
}
const _removeAlert = (alertId) => {
  return {type: REMOVE_ALERT, alertId}
}

export const setAlert = (msg, alertType, timeout = 5000) => {
  return dispatch => {
    const id = uuid4();
    dispatch(_setAlert({msg, alertType, id}));

    setTimeout(() => dispatch(_removeAlert(id)), timeout);
  }
}