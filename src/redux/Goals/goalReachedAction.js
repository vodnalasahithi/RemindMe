import goalsActionTypes from './goalsActionTypes';
import APIs from '../../config';
import { Status } from '../../Constants/Messages';
import cancelScheduledNotification from '../../Helpers/cancelScheduledNotification';

const goalReachedAction = (data, navigation) => {
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
          status: data.status,
          daysLeft: data.daysLeft,
          progress: data.progress,
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
    if (data.status === Status.COMPLETED) {
      await cancelScheduledNotification(JSON.stringify(data.notifyId));
    }

    dispatch({
      type: goalsActionTypes.GOAL_REACHED,
      payload: data,
    });
    navigation.goBack('UpComingGoals');
  };
};

export default goalReachedAction;
