import React, {useEffect, useCallback, useState} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {LogBox, Alert} from 'react-native';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';

import store from './src/redux/store';
import AppNavigator from './src/Navigation/index';
import * as RootNavigation from './src/Navigation/rootNavigation';
import {checkNotifications} from 'react-native-permissions';
import {requestNotifications} from 'react-native-permissions';
import {openSettings} from 'react-native-permissions';

const App = () => {
  LogBox.ignoreAllLogs();
  let permissionStatus;

  const openSettingsFunction = async () => {
    await openSettings().catch(() => console.warn('cannot open settings'));
    await checkNotificationsFunction();
  };
  const requestPermission = () => {
    requestNotifications(['alert', 'sound']).then(() => {
      Alert.alert(
        'TODO app need notification permission',
        'Please allow notifications for reminders',
        [{text: 'Allow', onPress: () => openSettingsFunction()}],
        {cancelable: false},
      );
    });
  };

  const checkNotificationsFunction = useCallback(() => {
    checkNotifications().then(({status}) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      permissionStatus = status;
      if (status !== 'granted') {
        requestPermission();
      }
    });
  }, [requestPermission]);

  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = (state) => {
    setAppState(state);
  };
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  useEffect(() => {
    checkNotificationsFunction();

    PushNotification.configure({
      onRegister: function (token) {
        AsyncStorage.setItem('fcmToken', JSON.stringify(token));
      },

      onNotification: function (notification) {
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

  if (permissionStatus !== 'blocked') {
    return (
      <Provider store={store}>
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    );
  } else {
    requestPermission();
    return null;
  }
};

export default App;
