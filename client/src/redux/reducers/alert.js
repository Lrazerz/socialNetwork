import {SET_ALERT, REMOVE_ALERT} from "../actions/types";

const initialState = [];

// todo deny multiple identical allerts (maybe with msg) smth, maybe in actions with getState param

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_ALERT:
      return [
        ...state,
        action.alert
      ]
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.alertId)
    default:
      return state;
  }
}
