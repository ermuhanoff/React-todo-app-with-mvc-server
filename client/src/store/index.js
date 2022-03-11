import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { categoriesReducer } from './categories';
import { modalsReducer } from './modals';
import { alertsReducer } from './alerts';
import { tasksReducer } from './tasks';

const combinedReducers = combineReducers({
  categories: categoriesReducer,
  tasks: tasksReducer,
  modals: modalsReducer,
  alerts: alertsReducer,
});
const composedDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combinedReducers,
  composedDevTools(applyMiddleware(thunk)),
);
