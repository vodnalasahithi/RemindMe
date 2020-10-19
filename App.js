/* eslint-disable no-use-before-define */
import React, { useEffect, useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { LogBox, Alert, AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { checkNotifications, requestNotifications, openSettings } from 'react-native-permissions';

import store from './src/redux/store';
import AppNavigator from './src/Navigation/index';
import * as RootNavigation from './src/Navigation/rootNavigation';
import Messages from './src/Constants/Messages';

const App = () => {
  LogBox.ignoreAllLogs();
  let permissionStatus;

  const openSettingsFunction = async () => {
    await openSettings().catch(() => console.warn(Messages.CANNOT_OPEN_SETTINGS));
    await checkNotificationsFunction();
  };
  const requestPermission = () => {
    requestNotifications(['alert', 'sound']).then(() => {
      Alert.alert(
        Messages.REQUIRE_NOTIFICATION_PERMISSION,
        Messages.ALLOW_NOTIFICATION,
        [{ text: 'Allow', onPress: () => openSettingsFunction() }],
        { cancelable: false }
      );
    });
  };

  const checkNotificationsFunction = useCallback(() => {
    checkNotifications().then(({ status }) => {
      permissionStatus = status;
      if (status !== Messages.GRANTED) {
        requestPermission();
      }
    });
  }, [requestPermission]);

  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = (state) => {
    setAppState(state);
  };
  useEffect(() => {
    AppState.addEventListener(Messages.CHANGE, handleAppStateChange);
    return () => {
      AppState.removeEventListener(Messages.CHANGE, handleAppStateChange);
    };
  }, []);
  useEffect(() => {
    checkNotificationsFunction();

    PushNotification.configure({
      onRegister(token) {
        AsyncStorage.setItem(Messages.FCM_TOKEN, JSON.stringify(token));
      },

      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotification.FetchResult.NoData);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }, [appState, checkNotificationsFunction]);

  if (permissionStatus !== Messages.BLOCKED) {
    return (
      <Provider store={store}>
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
  requestPermission();
  return null;
};

export default App;
