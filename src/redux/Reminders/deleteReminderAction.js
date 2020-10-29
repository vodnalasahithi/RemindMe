import remindersActionTypes from './remindersActionTypes';
import APIs, { Method } from '../../config';
import cancelScheduledNotification from '../../Helpers/cancelScheduledNotification';
import { Status } from '../../Constants/Messages';
import apiServiceWrapper from '../../apiServiceWrapper';

const deleteReminderAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.reminders + userId}/${data.key}${APIs.auth}${token}`,
      Method.DELETE
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    if (data.status === Status.PENDING) {
      await cancelScheduledNotification(JSON.stringify(data.notifyId));
    }

    dispatch({
      type: remindersActionTypes.DELETE_REMINDER,
      payload: data,
    });
    navigation.goBack();
  };
};

export default deleteReminderAction;
