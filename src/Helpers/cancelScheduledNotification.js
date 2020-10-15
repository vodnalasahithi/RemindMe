import PushNotification from 'react-native-push-notification';

const cancelScheduledNotification = (id) => {
  PushNotification.cancelLocalNotifications({ id });
};

export default cancelScheduledNotification;
