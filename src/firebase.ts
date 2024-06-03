import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import {Platform, PermissionsAndroid} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

if (Platform.OS === 'android') {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const initializeFB = (userId?: string) => {
  const getToken = async () => {
    try {
      const fcmToken = await firebase.messaging().getToken();
      console.log('TOKEN====>', fcmToken);
      // await saveFcmToken({ fcmToken, userId });
    } catch (error: any) {}
  };

  const registerForRemoteMessages = async () => {
    try {
      await firebase.messaging();
      await requestPermissions();
    } catch (error) {}
  };

  const requestPermissions = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        const enabled =
          status === messaging.AuthorizationStatus.AUTHORIZED ||
          status === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          onMessage();
          console.log('Authorization status:', status);
        }
      })
      .catch(e => console.log(e));
  };

  const onMessage = () => {
    firebase.messaging().onMessage(response => {
      console.log('RESPONSE:', response);
      showNotification(response?.notification);
    });
  };

  const showNotification = (notification: any) => {
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        id: uuidv4(),
        channelId: 'moniee-app-notification',
        title: notification?.title ?? 'New notification',
        message: notification?.body! ?? '',
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: uuidv4(),
        title: notification?.title ?? 'New notification',
        body: notification?.body! ?? '',
        foreground: true,
        userInteraction: true,
      });
    }
  };

  getToken();

  if (Platform.OS === 'ios') {
    registerForRemoteMessages();
  } else {
    onMessage();
  }
};
