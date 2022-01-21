import { AlertActionType, AlertAnyAction } from './actionsTypes';
import { AlertsState } from './types';

// todo deny multiple identical alerts (maybe with msg) smth, maybe in actions with getState param
export const alertsReducer = (state: AlertsState, action: AlertAnyAction) => {
  switch (action.type) {
    case AlertActionType.SetAlert:
      return [...state, action.alert];
    case AlertActionType.RemoveAlert:
      return state.filter(alert => alert.id !== action.alertId);
    default:
      return state;
  }
};
