import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
import cancelScheduledNotification from '../../Helpers/cancelScheduledNotification';
import { Status } from '../../Constants/Messages';

const deleteReminderAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await fetch(
      `${APIs.baseAPI + APIs.reminders + userId}/${data.key}${APIs.auth}${token}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();

    if (data.status === Status.PENDING) {
      await cancelScheduledNotification(JSON.stringify(data.notifyId));
    }

    dispatch({
      type: remindersActionTypes.DELETE_REMINDER,
      payload: data,
    });
    navigation.goBack('UpComingReminders');
  };
};

export default deleteReminderAction;
