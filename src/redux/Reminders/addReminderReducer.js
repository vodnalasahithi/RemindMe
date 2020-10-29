import { Status } from '../../Constants/Messages';
import remindersActionTypes from './remindersActionTypes';

const initialState = {
  allReminders: [],
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case remindersActionTypes.GET_REMINDER_DETAILS:
      return {
        ...state,
        allReminders: action.payload,
      };

    case remindersActionTypes.ADD_NEW_REMINDER:
      return {
        ...state,
        allReminders: state.allReminders.concat(action.payload),
      };

    case remindersActionTypes.MARK_REMINDER_AS_COMPLETE:
      return {
        ...state,

        allReminders: state.allReminders.map((allRemindersObject) =>
          allRemindersObject.id === action.payload.id
            ? {
                ...allRemindersObject,
                status: action.payload.status,
              }
            : {
                ...allRemindersObject,
              }
        ),
      };

    case remindersActionTypes.EDIT_REMINDER:
      return {
        ...state,
        allReminders: state.allReminders.map((allRemindersObject) =>
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
              }
        ),
      };
    case remindersActionTypes.MARK_REMINDER_AS_MISSED:
      return {
        ...state,
        allReminders: state.allReminders.map((allRemindersObject) =>
          allRemindersObject.id === action.payload.id
            ? {
                ...allRemindersObject,
                status: Status.MISSED,
              }
            : {
                ...allRemindersObject,
              }
        ),
      };
    case remindersActionTypes.DELETE_REMINDER:
      return {
        ...state,
        allReminders: state.allReminders.filter((item) => action.payload !== item),
      };

    default:
      return state;
  }
}
