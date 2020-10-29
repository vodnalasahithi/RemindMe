/* eslint-disable no-restricted-syntax */
import remindersActionTypes from './remindersActionTypes';
import APIs from '../../config';
import apiServiceWrapper from '../../apiServiceWrapper';

const getAllRemindersAction = () => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      APIs.baseAPI + APIs.reminders + userId + APIs.auth + token
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    const loadedReminders = [];

    for (const key in resData) {
      if (Object.prototype.hasOwnProperty.call(resData, key)) {
        loadedReminders.push({
          key,
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
    }

    const sortedReminders = loadedReminders.sort(function (a, b) {
      const dateA = new Date(a.reminderDate);
      const dateB = new Date(b.reminderDate);
      return dateA - dateB;
    });

    dispatch({
      type: remindersActionTypes.GET_REMINDER_DETAILS,
      payload: sortedReminders,
    });
  };
};

export default getAllRemindersAction;
