import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
import {Status} from '../../Constants/Messages';
const markReminderAsMissedAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;
    console.log('mark as missed function--------------', data);
    if (data.key !== undefined) {
      const response = await fetch(
        APIs.baseAPI +
          APIs.reminders +
          userId +
          '/' +
          data.key +
          APIs.auth +
          token,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: Status.MISSED,
          }),
        },
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorMessage = errorResData.error.message;
        throw new Error(errorMessage);
      }

      const resData = await response.json();

      dispatch({
        type: remindersActionTypes.MARK_REMINDER_AS_MISSED,
        payload: data,
      });
    }
  };
};

export default markReminderAsMissedAction;
