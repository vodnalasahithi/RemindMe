import React from 'react';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PropTypes from 'prop-types';

import App from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);

HeadlessCheck.propTypes = {
  isHeadless: PropTypes.bool,
};

HeadlessCheck.defaultProps = {
  isHeadless: undefined,
};
