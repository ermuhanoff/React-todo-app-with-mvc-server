import { getReducerMapping } from '../reducerMapping';
import { modalsActionTypes as types } from './ActionTypes';

const initialState = {
  type: '',
  data: null,
  isShowing: false,
};

const reducerMapping = {
  [types.CLOSE_MODAL]: (state) => ({
    ...state,
    type: '',
    data: null,
    isShowing: false,
  }),

  [types.OPEN_MODAL]: (state, payload) => ({
    ...state,
    type: payload.type,
    data: payload.data,
    isShowing: true,
  }),
};

export const modalsReducer = getReducerMapping(reducerMapping, initialState);
