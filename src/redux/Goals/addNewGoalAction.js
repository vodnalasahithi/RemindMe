import APIs from '../../config';
import goalsActionTypes from './goalsActionTypes';
import getAllGoalsAction from './getAllGoalsAction';
import { sendGoalNotification } from '../../Helpers/sendNotification';

const addNewGoalAction = (data) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await fetch(APIs.baseAPI + APIs.goals + userId + APIs.auth + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    sendGoalNotification(data);

    dispatch({
      type: goalsActionTypes.ADD_NEW_GOAL,
      payload: data,
    });
    await dispatch(getAllGoalsAction());
  };
};

export default addNewGoalAction;
