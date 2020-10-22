import goalsActionTypes from './goalsActionTypes';
import APIs, { Method } from '../../config';
import apiServiceWrapper from '../../apiServiceWrapper';
import { URLs, Status } from '../../Constants/Messages';
import cancelScheduledNotification from '../../Helpers/cancelScheduledNotification';

const deleteGoalAction = (data, navigation) => {
  return async (dispatch, getState) => {
    const token = await getState().login.token;
    const userId = await getState().login.userId;

    const response = await apiServiceWrapper(
      `${APIs.baseAPI + APIs.goals + userId}/${data.key}${APIs.auth}${token}`,
      Method.DELETE
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorMessage = errorResData.error.message;
      throw new Error(errorMessage);
    }

    if (data.status === Status.PENDING) {
      await cancelScheduledNotification(JSON.stringify(data.notifyId));
    }

    dispatch({
      type: goalsActionTypes.DELETE_GOAL,
      payload: data,
    });
    navigation.goBack(URLs.UpComingGoals);
  };
};

export default deleteGoalAction;
