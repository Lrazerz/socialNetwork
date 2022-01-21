import { Alert } from 'store/alerts/types';

export enum AlertActionType {
  SetAlert = 'SET_ALERT',
  RemoveAlert = 'REMOVE_ALERT',
}

export type AlertSetAction = {
  type: AlertActionType.SetAlert;
  alert: Alert;
};

export type AlertRemoveAction = {
  type: AlertActionType.RemoveAlert;
  alertId: Alert['id'];
};

export type AlertAnyAction = AlertSetAction | AlertRemoveAction;
