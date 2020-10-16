import goalsActionTypes from './goalsActionTypes';
import APIs from '../../config';

const deleteGoalAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await fetch(
      `${APIs.baseAPI + APIs.goals + userId}/${data.key}${APIs.auth}${token}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    dispatch({
      type: goalsActionTypes.DELETE_GOAL,
      payload: data,
    });
    navigation.goBack('UpComingGoals');
  };
};

export default deleteGoalAction;
