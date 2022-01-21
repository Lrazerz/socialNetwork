import { v4 as uuid4 } from 'uuid';

import { DevConnectorThunkDispatch } from '../common/types';
import { Alert, AlertType } from './types';
import { AlertActionType, AlertSetAction, AlertRemoveAction } from './actionsTypes';

const setAlertActionCreator = (alert: Alert): AlertSetAction => ({
  type: AlertActionType.SetAlert,
  alert,
});

const removeAlertActionCreator = (alertId: string): AlertRemoveAction => ({
  type: AlertActionType.RemoveAlert,
  alertId,
});

export const setAlert =
  (msg: string, type: AlertType, timeout = 5000) =>
  (dispatch: DevConnectorThunkDispatch) => {
    const id = uuid4();

    dispatch(setAlertActionCreator({ msg, type, id }));

    setTimeout(() => dispatch(removeAlertActionCreator(id)), timeout);
  };
