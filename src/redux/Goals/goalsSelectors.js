import { Status } from '../../Constants/Messages';

const getAllGoalsSelector = (state) => {
  return state.goals;
};

export const getAllGoals = (state) => {
  return getAllGoalsSelector(state).allGoals;
};

export const getAllPendingGoals = (state) => {
  return getAllGoalsSelector(state).allGoals.filter((item) => item.status !== Status.COMPLETED);
};
export const getAllCompletedGoals = (state) => {
  return getAllGoalsSelector(state).allGoals.filter((item) => item.status === Status.COMPLETED);
};
