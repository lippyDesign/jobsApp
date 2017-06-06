import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  // check device's internal storage for the pushtoken- token that states that user gave permissions to send push notifications
  let previousToken = await AsyncStorage.getItem('pushtoken');
  // if user already athorized notifications, simply return early
  console.log(previousToken)
  if (previousToken) {
    return;
  } else {
    // status is the actual answer by user
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    // if permissions were granted or undetermined
    if (status !== 'granted') return;
    // generate token that identifies the person's device.
    let token = await Notifications.getExponentPushTokenAsync();
    // send the token off to our backend
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    // send the token off to the devices internal storage
    AsyncStorage.setItem('pushtoken', token);
  }
};