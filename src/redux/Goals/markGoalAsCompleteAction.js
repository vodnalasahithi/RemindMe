import goalsActionTypes from './goalsActionTypes';
import APIs, { Method } from '../../config';
import apiServiceWrapper from '../../apiServiceWrapper';

const markGoalAsCompleteAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.goals + userId}/${data.key}${APIs.auth}${token}`,
      Method.PATCH,
      JSON.stringify({
        daysLeft: data.daysLeft,
        progress: data.progress,
        goalCompletedTime: data.goalCompletedTime,
      })
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    dispatch({
      type: goalsActionTypes.MARK_GOAL_AS_COMPLETE,
      payload: data,
    });
  };
};

export default markGoalAsCompleteAction;
