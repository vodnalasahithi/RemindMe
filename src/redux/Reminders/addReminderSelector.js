import { Status } from '../../Constants/Messages';

const getReminderDetailsSelector = (state) => {
  return state.reminder;
};

export const getPendingReminders = (state) => {
  const pendingReminders = getReminderDetailsSelector(state).allReminders.filter(
    (item) => item.status !== Status.MISSED
  );
  return pendingReminders;
};

export const getReminderDetails = (state) => {
  return getReminderDetailsSelector(state).allReminders.filter(
    (item) => item.status !== Status.COMPLETED
  );
};

export const getAllReminders = (state) => {
  return getReminderDetailsSelector(state).allReminders;
};

export const getCompletedReminders = (state) => {
  return getReminderDetailsSelector(state).allReminders.filter(
    (item) => item.status === Status.COMPLETED
  );
};
