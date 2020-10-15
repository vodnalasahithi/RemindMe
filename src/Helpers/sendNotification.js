import PushNotification from 'react-native-push-notification';

const sendNotification = (data) => {
  PushNotification.localNotificationSchedule({
    invokeApp: true,
    id: data.notifyId,
    title: data.description,
    message: data.reminderTime,
    date: data.notifyTime,
    allowWhileIdle: false,
    userInfo: { id: data.notifyId },
  });
};

export const sendGoalNotification = (data) => {
  PushNotification.localNotificationSchedule({
    invokeApp: true,
    id: data.notifyId,
    title: data.goalDescription,
    message: data.goalTime,
    date: data.notifyTime,
    allowWhileIdle: false,
    userInfo: { id: data.notifyId },
    repeatType: 'day',
  });
};
export default sendNotification;
