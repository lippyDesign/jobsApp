import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

// return an arrow function, dispatching an action and using thunk middleware because
// AsyncStorage takes time to get data out of the device's internal storage 
export const facebookLogin = () => async dispatch => {
  // attempt to get token from devices internal storage
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // if token exists dispatch FACEBOOK_LOGIN_SUCCESS action, saying FB login is complete
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // if no token, Start up FB Login process
    doFacebookLogin(dispatch);
  }
};

// the doFacebookLogin function will handle obtaining token from facebook and saving it to AsyncStorage
const doFacebookLogin = async dispatch => {
  // attempt to log in with permissions;
  // first argument is the app id (from facebook dev page), the second argument is the permissions we want to have from facebook
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1904977846456198', { permissions: ['public_profile'] });
  // if user did not authorize or facebook log in failed, return early and disptach FACEBOOK_LOGIN_FAIL
  if (type === 'cencel') return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  // if we recieved token (facebook login successful), save the token in devices local storage
  await AsyncStorage.setItem('fb_token', token);
  // and disptach FACEBOOK_LOGIN_SUCCESS
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
