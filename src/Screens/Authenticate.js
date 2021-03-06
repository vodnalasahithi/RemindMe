import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';

import { Colors } from '../Constants/Colors';
import { authenticateAction, userLoginStatus } from '../redux/Login/loginAction';
import Messages, { Sizes } from '../Constants/Messages';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Authenticate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem(Messages.USER_DATA);
      if (!userData) {
        dispatch(userLoginStatus());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate, email } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId || !email) {
        dispatch(userLoginStatus());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authenticateAction(userId, token, expirationTime, email));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={Sizes.LARGE} color={Colors.primary} />
    </View>
  );
};

export default Authenticate;
