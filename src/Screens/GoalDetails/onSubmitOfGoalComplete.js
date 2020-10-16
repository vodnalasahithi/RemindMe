import markGoalAsCompleteAction from '../../redux/Goals/markGoalAsCompleteAction';
import calculateProgressValue from '../../Helpers/calculateProgressValue';

const onSubmitOfGoalComplete = async (goalDetails, dispatch) => {
  const daysLeft = await (goalDetails.daysLeft - 1);
  const progressValue = await calculateProgressValue(daysLeft);
  const data = {
    key: goalDetails.key,
    goalId: goalDetails.goalId,
    status: goalDetails.status,
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
  dispatch(markGoalAsCompleteAction(data));
};

export default onSubmitOfGoalComplete;
