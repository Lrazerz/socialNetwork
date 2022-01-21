import { useSelector } from 'react-redux';
import { FC } from 'react';
import { Store } from 'store/types';
import { Alert } from 'types/Alert';
import { AlertsState } from 'store/alerts/types';

const Alerts: FC = () => {
  const alerts = useSelector<Store, AlertsState>(state => state.alert);

  if (alerts.length === 0) return null;

  return (
    <>
      {alerts.map((alert, idx) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.type}`}
          style={{
            left: `${(window.innerWidth / 2 - 150).toString()}px`,
            top: `${idx * 100 + 60}px`,
          }}
        >
          {alert.msg}
        </div>
      ))}
    </>
  );
};

export default Alerts;
