import {Status} from '../../Constants/Messages';

const getReminderDetailsSelector = (state) => {
  return state.reminder;
};

export const getPendingReminders = (state) => {
  const pendingReminders = getReminderDetailsSelector(
    state,
  ).reminderDetails.filter((item) => item.status !== Status.MISSED);
  return pendingReminders;
};

export const getReminderDetails = (state) => {
  return getReminderDetailsSelector(state).reminderDetails;
};

export const getCompletedReminders = (state) => {
  return getReminderDetailsSelector(state).completedReminders;
};
