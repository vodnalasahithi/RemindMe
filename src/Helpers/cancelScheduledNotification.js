import PushNotification from 'react-native-push-notification';

const cancelScheduledNotification = (id) => {
  console.log('cancel notification success');
  PushNotification.cancelLocalNotifications({id: id});
};

export default cancelScheduledNotification;
