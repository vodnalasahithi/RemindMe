import remindersActionTypes from './remindersActionTypes';
import APIs, { Method } from '../../config';
import getAllRemindersAction from './getAllReminderAction';
import sendNotification from '../../Helpers/sendNotification';
import apiServiceWrapper from '../../apiServiceWrapper';

const addReminderAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      APIs.baseAPI + APIs.reminders + userId + APIs.auth + token,
      Method.POST,
      JSON.stringify(data)
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    sendNotification(data);

    dispatch({
      type: remindersActionTypes.ADD_NEW_REMINDER,
      payload: data,
    });
    await dispatch(getAllRemindersAction());
  };
};

export default addReminderAction;
