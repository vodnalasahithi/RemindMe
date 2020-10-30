/* eslint-disable no-restricted-syntax */
import goalsActionTypes from './goalsActionTypes';
import APIs from '../../config';
import apiServiceWrapper from '../../apiServiceWrapper';

const getAllGoalsAction = () => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      APIs.baseAPI + APIs.goals + userId + APIs.auth + token
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    const loadedGoals = [];

    for (const key in resData) {
      if (Object.prototype.hasOwnProperty.call(resData, key)) {
        loadedGoals.push({
          key,
          goalId: resData[key].goalId,
          email: resData[key].email,
          goalDescription: resData[key].goalDescription,
          goalStartDate: resData[key].goalStartDate,
          goalEndDate: resData[key].goalEndDate,
          goalTime: resData[key].goalTime,
          status: resData[key].status,
          daysLeft: resData[key].daysLeft,
          progress: resData[key].progress,
          goalCompletedTime: resData[key].goalCompletedTime,
          notifyTime: resData[key].notifyTime,
          notifyId: resData[key].notifyId,
        });
      }
    }

    dispatch({
      type: goalsActionTypes.GET_ALL_GOALS,
      payload: loadedGoals,
      // completedGoals: loadedGoals.filter((item) => item.status === Status.COMPLETED),
    });
  };
};

export default getAllGoalsAction;
