import { AlertActionType, AlertAnyAction } from './actionsTypes';
import { alertsInitialState } from './initialState';

// eslint-disable-next-line @typescript-eslint/default-param-last
export const alertsReducer = (state = alertsInitialState, action: AlertAnyAction) => {
  switch (action.type) {
    case AlertActionType.SetAlert:
      return [...state, action.alert];
    case AlertActionType.RemoveAlert:
      return state.filter(alert => alert.id !== action.alertId);
    default:
      return state;
  }
};
