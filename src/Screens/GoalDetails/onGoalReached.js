import { Status } from '../../Constants/Messages';
import calculateProgressValue from '../../Helpers/calculateProgressValue';
import goalReachedAction from '../../redux/Goals/goalReachedAction';

const onGoalReached = async (goalDetails, navigation, dispatch) => {
  const daysLeft = await (goalDetails.daysLeft - 1);
  const progressValue = await calculateProgressValue(daysLeft);
  const data = {
    key: goalDetails.key,
    goalId: goalDetails.goalId,
    status: Status.COMPLETED,
    goalDescription: goalDetails.goalDescription,
    goalStartDate: goalDetails.goalStartDate,
    goalEndDate: goalDetails.goalEndDate,
    goalTime: goalDetails.goalTime,
    email: goalDetails.email,
    daysLeft,
    progress: progressValue,
    goalCompletedTime: new Date().toDateString(),
    notifyTime: goalDetails.notifyTime,
    notifyId: goalDetails.notifyId,
  };
  dispatch(goalReachedAction(data, navigation));
};

export default onGoalReached;
