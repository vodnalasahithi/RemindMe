import goalsActionTypes from './goalsActionTypes';
import APIs from '../../config';

const restartGoalAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await fetch(
      `${APIs.baseAPI + APIs.goals + userId}/${data.key}${APIs.auth}${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          daysLeft: data.daysLeft,
          progress: data.progress,
          goalStartDate: data.goalStartDate,
          goalEndDate: data.goalEndDate,
          goalCompletedTime: data.goalCompletedTime,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();

    dispatch({
      type: goalsActionTypes.RESTART_GOAL,
      payload: data,
    });
  };
};

export default restartGoalAction;
