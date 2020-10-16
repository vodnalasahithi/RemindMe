import restartGoalAction from '../../redux/Goals/restartGoalAction';

const confirmOnRestartGoal = (goalDetails, dispatch) => {
  const data = {
    key: goalDetails.key,
    goalId: goalDetails.goalId,
    status: goalDetails.status,
    goalDescription: goalDetails.goalDescription,
    goalTime: goalDetails.goalTime,
    email: goalDetails.email,
    daysLeft: 21,
    progress: 0,
    goalStartDate: new Date().toDateString(),
    goalEndDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toDateString(),
    goalCompletedTime: '',
    notifyTime: goalDetails.notifyTime,
    notifyId: goalDetails.notifyId,
  };
  dispatch(restartGoalAction(data));
};

export default confirmOnRestartGoal;
