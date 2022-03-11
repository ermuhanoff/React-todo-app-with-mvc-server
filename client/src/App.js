import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';

import { store } from './store';
import { PageSwitcher } from './components/pageSwitcher';
import { Modal } from './components/modal';
import { AlertContainer } from './components/alert';
import { FocusLock } from './components/focusLock/FocusLock';

const App = () => (
  <div className='App'>
    <Provider store={store}>
      <FocusLock>
        <PageSwitcher />
        <Modal />
        <AlertContainer />
      </FocusLock>
    </Provider>
  </div>
);

export default App;
