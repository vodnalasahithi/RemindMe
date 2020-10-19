import AsyncStorage from '@react-native-community/async-storage';
import Messages from '../Constants/Messages';

const getAsyncStoreData = async () => {
  const userData = await AsyncStorage.getItem(Messages.USER_DATA);
  const transformedData = JSON.parse(userData);
  return transformedData;
};

export default getAsyncStoreData;
