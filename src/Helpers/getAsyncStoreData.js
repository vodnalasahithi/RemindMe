import AsyncStorage from '@react-native-community/async-storage';

const getAsyncStoreData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(userData);
  return transformedData;
};

export default getAsyncStoreData;
