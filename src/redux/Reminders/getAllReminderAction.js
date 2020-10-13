import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
import {Status} from '../../Constants/Messages';

const getAllRemindersAction = () => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;
    const response = await fetch(
      APIs.baseAPI + APIs.reminders + userId + APIs.auth + token,
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    const loadedReminders = [];

    for (const key in resData) {
      await loadedReminders.push({
        key: key,
        id: resData[key].id,
        email: resData[key].email,
        description: resData[key].description,
        reminderDate: resData[key].reminderDate,
        reminderTime: resData[key].reminderTime,
        status: resData[key].status,
        notifyTime: resData[key].notifyTime,
        notifyId: resData[key].notifyId,
      });
    }

    let sortedReminders = await loadedReminders.sort(function (a, b) {
      let dateA = new Date(a.reminderDate),
        dateB = new Date(b.reminderDate);
      return dateA - dateB;
    });
    dispatch({
      type: remindersActionTypes.GET_REMINDER_DETAILS,
      payload: sortedReminders.filter(
        (item) => item.status !== Status.COMPLETED,
      ),
      completedReminders: sortedReminders.filter(
        (item) => item.status === Status.COMPLETED,
      ),
    });
  };
};

export default getAllRemindersAction;
