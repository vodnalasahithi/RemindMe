import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
import getAllRemindersAction from './getAllReminderAction';
import sendNotification from '../../Helpers/sendNotification';

const addReminderAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await fetch(APIs.baseAPI + APIs.reminders + userId + APIs.auth + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    sendNotification(data);

    dispatch({
      type: remindersActionTypes.ADD_NEW_REMINDER,
      payload: data,
    });
    await dispatch(getAllRemindersAction());
  };
};

export default addReminderAction;
