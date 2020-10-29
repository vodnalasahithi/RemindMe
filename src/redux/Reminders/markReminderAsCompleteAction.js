import remindersActionTypes from './remindersActionTypes';
import APIs, { Method } from '../../config';
import apiServiceWrapper from '../../apiServiceWrapper';
import { URLs } from '../../Constants/Messages';
import cancelScheduledNotification from '../../Helpers/cancelScheduledNotification';

const markReminderAsCompleteAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.reminders + userId}/${data.key}${APIs.auth}${token}`,
      Method.PATCH,
      JSON.stringify({
        status: data.status,
      })
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    await cancelScheduledNotification(JSON.stringify(data.notifyId));

    dispatch({
      type: remindersActionTypes.MARK_REMINDER_AS_COMPLETE,
      id: data.id,
      payload: data,
    });
    navigation.goBack(URLs.UpComingReminders);
  };
};

export default markReminderAsCompleteAction;
