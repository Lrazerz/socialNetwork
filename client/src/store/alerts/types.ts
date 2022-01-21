type AlertStateType = 'primary' | 'success' | 'danger';

type AlertColorType = 'white' | 'light' | 'dark';

export type AlertType = AlertStateType | AlertColorType;

export type Alert = {
  id: string;
  type: AlertType;
  msg: string;
};

export type AlertsState = Alert[];
