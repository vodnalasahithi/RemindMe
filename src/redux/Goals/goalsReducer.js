import goalsActionTypes from './goalsActionTypes';

const initialState = {
  allGoals: [],
  // completedGoals: [],
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case goalsActionTypes.ADD_NEW_GOAL:
      return {
        ...state,
        allGoals: state.allGoals.concat(action.payload),
      };
    case goalsActionTypes.GET_ALL_GOALS:
      return {
        ...state,
        allGoals: action.payload,
        // completedGoals: action.completedGoals,
      };

    case goalsActionTypes.DELETE_GOAL:
      return {
        ...state,
        allGoals: state.allGoals.filter((item) => action.payload !== item),
      };

    case goalsActionTypes.MARK_GOAL_AS_COMPLETE:
      return {
        ...state,
        allGoals: state.allGoals.map((allGoalsObject) =>
          allGoalsObject.goalId === action.payload.goalId
            ? {
                ...allGoalsObject,
                daysLeft: action.payload.daysLeft,
                progress: action.payload.progress,
                goalCompletedTime: action.payload.goalCompletedTime,
              }
            : {
                ...allGoalsObject,
              }
        ),
      };

    case goalsActionTypes.GOAL_REACHED:
      return {
        ...state,
        // allGoals: state.allGoals.filter((item) => action.payload.goalId !== item.goalId),
        // completedGoals: state.completedGoals.concat(action.payload),

        allGoals: state.allGoals.map((allGoalsObject) =>
          allGoalsObject.goalId === action.payload.goalId
            ? {
                ...allGoalsObject,
                status: action.payload.status,
                daysLeft: action.payload.daysLeft,
                progress: action.payload.progress,
                goalCompletedTime: action.payload.goalCompletedTime,
              }
            : {
                ...allGoalsObject,
              }
        ),
      };

    case goalsActionTypes.RESTART_GOAL:
      return {
        ...state,
        allGoals: state.allGoals.map((allGoalsObject) =>
          allGoalsObject.goalId === action.payload.goalId
            ? {
                ...allGoalsObject,
                daysLeft: action.payload.daysLeft,
                progress: action.payload.progress,
                goalStartDate: action.payload.goalStartDate,
                goalEndDate: action.payload.goalEndDate,
                goalCompletedTime: action.payload.goalCompletedTime,
                status: action.payload.status,
              }
            : {
                ...allGoalsObject,
              }
        ),
      };
    default:
      return state;
  }
}
