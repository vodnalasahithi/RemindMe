import goalsActionTypes from './goalsActionTypes';
import APIs, { Method } from '../../config';
import { Status, URLs } from '../../Constants/Messages';
import cancelScheduledNotification from '../../Helpers/cancelScheduledNotification';
import apiServiceWrapper from '../../apiServiceWrapper';

const goalReachedAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.goals + userId}/${data.key}${APIs.auth}${token}`,
      Method.PATCH,
      JSON.stringify({
        status: data.status,
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

    if (data.status === Status.COMPLETED) {
      await cancelScheduledNotification(JSON.stringify(data.notifyId));
    }

    dispatch({
      type: goalsActionTypes.GOAL_REACHED,
      payload: data,
    });
    navigation.goBack(URLs.UpComingGoals);
  };
};

export default goalReachedAction;
