import APIs, { Method } from '../../config';
import goalsActionTypes from './goalsActionTypes';
import getAllGoalsAction from './getAllGoalsAction';
import { sendGoalNotification } from '../../Helpers/sendNotification';
import apiServiceWrapper from '../../apiServiceWrapper';

const addNewGoalAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      APIs.baseAPI + APIs.goals + userId + APIs.auth + token,
      Method.POST,
      JSON.stringify(data)
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    await sendGoalNotification(data);

    dispatch({
      type: goalsActionTypes.ADD_NEW_GOAL,
      payload: data,
    });
    await dispatch(getAllGoalsAction());
  };
};

export default addNewGoalAction;
