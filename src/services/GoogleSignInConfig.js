// GoogleSignInConfig.js
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Configure Google Sign-In with your web client ID
GoogleSignin.configure({
  webClientId:
    '796833260683-du7bh4rjiefkhiaqv1d8149800pp5eh3.apps.googleusercontent.com',
  iosClientId:
    '796833260683-a747kvfsmr32p83hk3ji04v0tg04eq32.apps.googleusercontent.com',
  offlineAccess: true,
});

export default GoogleSignin;
