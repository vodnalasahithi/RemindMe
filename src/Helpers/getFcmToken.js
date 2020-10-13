import AsyncStorage from '@react-native-community/async-storage';

const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  const transformedData = await JSON.parse(fcmToken);
  return transformedData;
};

export default getFcmToken;
