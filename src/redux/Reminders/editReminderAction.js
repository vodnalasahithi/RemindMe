import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
import sendNotification from '../../Helpers/sendNotification';

const editReminderAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await fetch(
      `${APIs.baseAPI + APIs.reminders + userId}/${data.key}${APIs.auth}${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: data.description,
          reminderDate: data.reminderDate,
          reminderTime: data.reminderTime,
          status: data.status,
          notifyTime: data.notifyTime,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    await sendNotification(data);

    dispatch({
      type: remindersActionTypes.EDIT_REMINDER,
      payload: data,
    });
  };
};

export default editReminderAction;
