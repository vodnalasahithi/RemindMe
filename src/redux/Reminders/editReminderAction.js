import remindersActionTypes from './remindersActionTypes';
import APIs, { Method } from '../../config';
import sendNotification from '../../Helpers/sendNotification';
import apiServiceWrapper from '../../apiServiceWrapper';

const editReminderAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.reminders + userId}/${data.key}${APIs.auth}${token}`,
      Method.PATCH,
      JSON.stringify({
        description: data.description,
        reminderDate: data.reminderDate,
        reminderTime: data.reminderTime,
        status: data.status,
        notifyTime: data.notifyTime,
      })
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    await sendNotification(data);

    dispatch({
      type: remindersActionTypes.EDIT_REMINDER,
      payload: data,
    });
  };
};

export default editReminderAction;
