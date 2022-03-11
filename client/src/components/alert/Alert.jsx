import React from 'react';

import './scss/Alert.scss';

const mapMessagesToElements = (messages) => messages.map((message) => (
  <div key={Date.now()} className='alert-messages-submessage mt-2'>
    {message}
  </div>
));

export const Alert = ({ type, message, subMessages, onCloseButtonHandler }) => (
  <div
    className={`alert alert-custom ${type}`}
    role='alert'
  >
    <div className='alert-messages'>
      {message}
      {mapMessagesToElements(subMessages)}
    </div>
    <button type='button' className='btn-close' onClick={onCloseButtonHandler} />
  </div>
);
