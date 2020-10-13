import {Status} from '../../Constants/Messages';
import remindersActionTypes from './remindersActionTypes';

const initialState = {
  reminderDetails: [],
  completedReminders: [],
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case remindersActionTypes.GET_REMINDER_DETAILS:
      return {
        ...state,
        reminderDetails: action.payload,
        completedReminders: action.completedReminders,
      };

    case remindersActionTypes.ADD_NEW_REMINDER:
      return {
        ...state,
        reminderDetails: state.reminderDetails.concat(action.payload),
      };

    case remindersActionTypes.MARK_REMINDER_AS_COMPLETE:
      return {
        ...state,
        reminderDetails: state.reminderDetails.filter(
          (item) => action.payload.id !== item.id,
        ),
        completedReminders: state.completedReminders.concat(action.payload),
      };

    case remindersActionTypes.EDIT_REMINDER:
      return {
        ...state,
        reminderDetails: state.reminderDetails.map((allRemindersObject) =>
          allRemindersObject.id === action.payload.id
            ? {
                ...allRemindersObject,
                description: action.payload.description,
                reminderDate: action.payload.reminderDate,
                reminderTime: action.payload.reminderTime,
                status: action.payload.status,
                notifyTime: action.payload.notifyTime,
              }
            : {
                ...allRemindersObject,
              },
        ),
      };
    case remindersActionTypes.MARK_REMINDER_AS_MISSED:
      return {
        ...state,
        reminderDetails: state.reminderDetails.map((allRemindersObject) =>
          allRemindersObject.id === action.payload.id
            ? {
                ...allRemindersObject,
                status: Status.MISSED,
              }
            : {
                ...allRemindersObject,
              },
        ),
      };
    case remindersActionTypes.DELETE_REMINDER:
      return {
        ...state,
        reminderDetails: state.reminderDetails.filter(
          (item) => action.payload !== item,
        ),
      };

    default:
      return state;
  }
}
