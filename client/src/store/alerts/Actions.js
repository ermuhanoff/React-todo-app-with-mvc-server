import { alertsActionTypes as types } from './ActionTypes';
import { alertTypes } from '../../components/alert/alertTypes';

export const openAlertThunk = (type, message, subMessages, lifeTime = 7000) => (
  async (dispatch) => {
    const newAlertId = Date.now();

    dispatch(openAlertAction(type, message, newAlertId, subMessages));

    setTimeout(() => dispatch(closeModalAction(newAlertId)), lifeTime);
  }
);

export const openErrorAlertThunk = (error) => (dispatch) => {
  const messages = Object.values(error.errors);

  dispatch(openAlertThunk(alertTypes.ERROR_ALERT, error.message, messages));
};

export const openSuccessAlertThunk = (message, subMessages = []) => (dispatch) => {
  dispatch(openAlertThunk(alertTypes.SUCCESS_ALERT, message, subMessages));
};

const openAlertAction = (type, message, id, subMessages) => ({
  type: types.OPEN_ALERT,
  payload: { type, message, id, subMessages },
});

export const closeModalAction = (alertId) => ({
  type: types.CLOSE_ALERT,
  payload: alertId,
});
