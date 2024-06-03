/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message handled:', remoteMessage);
});

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('App opened by notification while in foreground:', remoteMessage);
});
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    console.log('App opened by notification from closed state:', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);
