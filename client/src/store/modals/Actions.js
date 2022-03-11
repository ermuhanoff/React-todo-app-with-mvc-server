import { modalsActionTypes as types } from './ActionTypes';

export const openModalAction = (type, data) => ({
  type: types.OPEN_MODAL,
  payload: { type, data },
});

export const closeModalAction = () => ({ type: types.CLOSE_MODAL });
