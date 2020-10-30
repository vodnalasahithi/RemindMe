import goalsActionTypes from './goalsActionTypes';
import APIs, { Method } from '../../config';
import apiServiceWrapper from '../../apiServiceWrapper';
import { sendGoalNotification } from '../../Helpers/sendNotification';

const restartGoalAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.goals + userId}/${data.key}${APIs.auth}${token}`,
      Method.PATCH,
      JSON.stringify({
        daysLeft: data.daysLeft,
        progress: data.progress,
        goalStartDate: data.goalStartDate,
        goalEndDate: data.goalEndDate,
        goalCompletedTime: data.goalCompletedTime,
        status: data.status,
      })
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    await sendGoalNotification(data);

    dispatch({
      type: goalsActionTypes.RESTART_GOAL,
      payload: data,
    });
  };
};

export default restartGoalAction;
