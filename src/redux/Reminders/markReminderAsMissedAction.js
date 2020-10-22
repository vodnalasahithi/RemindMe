import remindersActionTypes from './remindersActionTypes';
import APIs, { Method } from '../../config';
import { Status } from '../../Constants/Messages';
import apiServiceWrapper from '../../apiServiceWrapper';

const markReminderAsMissedAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;
    if (data.key !== undefined) {
      const response = await apiServiceWrapper(
        `${APIs.baseAPI + APIs.reminders + userId}/${data.key}${APIs.auth}${token}`,
        Method.PATCH,
        JSON.stringify({
          status: Status.MISSED,
        })
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorMessage = errorResData.error.message;
        throw new Error(errorMessage);
      }

      dispatch({
        type: remindersActionTypes.MARK_REMINDER_AS_MISSED,
        payload: data,
      });
    }
  };
};

export default markReminderAsMissedAction;
