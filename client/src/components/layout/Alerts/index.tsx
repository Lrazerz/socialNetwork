import { FC } from 'react';
import { useSelector } from 'react-redux';
import { DevConnectorStore } from 'store/types';

const Alerts: FC = () => {
  const alerts = useSelector(({ alerts: alertsStoreState }: DevConnectorStore) => alertsStoreState);

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
