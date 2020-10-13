const getAllGoalsSelector = (state) => {
  return state.goals;
};

export const getAllGoals = (state) => {
  return getAllGoalsSelector(state).allGoals;
};

export const getAllCompletedGoals = (state) => {
  return getAllGoalsSelector(state).completedGoals;
};
