import React from 'react';
import {useSelector} from "react-redux";

const Alert = props => {
  const alerts = useSelector(({alert}) => alert);

  const returnContent = alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ))


  return returnContent;
}

export default Alert;