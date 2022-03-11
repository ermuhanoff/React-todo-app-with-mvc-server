import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllAlerts } from '../../store/alerts/Selectors';
import { closeModalAction } from '../../store/alerts/Actions';
import { Alert } from './Alert';

export const AlertContainer = () => {
  const alerts = useSelector(getAllAlerts);
  const dispatch = useDispatch();

  const onCloseButtonHandler = (alertId) => {
    dispatch(closeModalAction(alertId));
  };

  const mapAlertsToElements = (alertsList) => alertsList
    .map((alert) => (
      <Alert
        key={alert.id}
        type={alert.type}
        message={alert.message}
        subMessages={alert.subMessages}
        id={alert.id}
        onCloseButtonHandler={() => onCloseButtonHandler(alert.id)}
      />
    ));

  return ReactDOM.createPortal(
    <div className='alerts position-fixed bottom-0 start-0 p-2'>
      {mapAlertsToElements(alerts)}
    </div>,
    document.querySelector('#root'),
  );
};
