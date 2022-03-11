import { getReducerMapping } from '../reducerMapping';
import { alertsActionTypes as types } from './ActionTypes';

const initialState = { list: [] };

const reducerMapping = {
  [types.CLOSE_ALERT]: (state, alertId) => ({
    ...state,
    list: state.list.filter((alert) => alert.id !== alertId),
  }),

  [types.OPEN_ALERT]: (state, payload) => ({
    ...state,
    list: [
      {
        id: payload.id,
        type: payload.type,
        message: payload.message,
        subMessages: payload.subMessages,
      },
      ...state.list,
    ],
  }),
};

export const alertsReducer = getReducerMapping(reducerMapping, initialState);
