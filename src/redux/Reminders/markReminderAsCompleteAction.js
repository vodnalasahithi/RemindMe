import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
const markReminderAsCompleteAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

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
          status: data.status,
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
      type: remindersActionTypes.MARK_REMINDER_AS_COMPLETE,
      id: data.id,
      payload: data,
    });
    navigation.goBack('UpComingReminders');
  };
};

export default markReminderAsCompleteAction;
