const Messages = {
  MISSED_WARNING: 'Missed reminder !',
  TODAY: 'Today',
  VALIDATION_MESSAGE: 'Please enter the details',
  NO_GOALS_FOUND: 'No Goals found',
  NO_REMINDERS_FOUND: 'No reminders found',
  MARK_AS_COMPLETE: 'Mark as complete',
  EDIT: 'Edit',
  SAVE: 'Save',
  DATE_TITLE: 'Date',
  TIME_TITLE: 'Time',
  AN_ERROR_OCCURRED: 'An Error Occurred!',
  SIGN_UP: 'Sign Up',
  LOGIN: 'Login',
  PASSWORD: 'Password',
  EMAIL: 'E-Mail',
  PASSWORD_VALIDATION: 'Please enter a valid password.',
  EMAIL_VALIDATION: 'Please enter a valid email address.',
  PROGRESS_VALUE: 'Progress : ',
  DAYS_LEFT: ' days left',
  MISSED_IT_START_AGAIN: 'Missed it! Start again',
  TOTAL_DAYS: 21,
  REMIND_ME_AT: 'Remind me at',

  // Alert messages
  CONGRATULATIONS: 'Congratulations!',
  DAY_CONQUERED: 'Day Conquered! Keep going.',
  ALREADY_MARKED_GOAL: 'You have already marked this goal.',
  DISMISS: 'Dismiss',
  KUDOS_YOU_DID_IT: 'Kudos! You did it.',
  OK: 'Okay',
  RESTART_GOAL_PROGRESS: 'Restart goal progress?',
  CANCEL: 'Cancel',
  CONFIRM: 'Confirm',

  IOS: 'ios',

  USER_DATA: 'userData',
  // Date picker modes
  DATE: 'date',
  TIME: 'time',

  // Notifications
  CANNOT_OPEN_SETTINGS: 'Cannot open settings',
  REQUIRE_NOTIFICATION_PERMISSION: 'TODO app needs notification permission',
  ALLOW_NOTIFICATION: 'Please allow notifications for reminders',
  GRANTED: 'granted',
  CHANGE: 'change',
  FCM_TOKEN: 'fcmToken',
  BLOCKED: 'blocked',
};

export const Status = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  MISSED: 'MISSED',
};

export const URLs = {
  AddReminder: 'AddReminder',
  ReminderDetails: 'ReminderDetails',
  AddGoal: 'AddGoal',
  GoalDetails: 'GoalDetails',
  UpComingReminders: 'UpComingReminders',
  UpComingGoals: 'UpComingGoals',
};

export const Sizes = {
  LARGE: 'large',
  SMALL: 'small',
};

export const Icons = {
  TRASH: 'trash',
  CALENDAR_ALT: 'calendar-alt',
  CLOCK: 'clock',
  PENCIL_ALT: 'pencil-alt',
  CHECK: 'check',
  EXCLAMATIONCIRCLEO: 'exclamationcircleo',
  RUNNING: 'running',
};
export const EMAIL_REGULAR_EXPRESSION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Messages;
