import 'react-native-url-polyfill/auto';
import 'react-native-reanimated';
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {useSelector} from 'react-redux';

// Import your screens
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';

enableScreens(true);
const Stack = createNativeStackNavigator();

const Routes = () => {
  const navigationRef = useRef(null);
  const user = useSelector(state => state.user.user);
  console.log('user exist ..? ', user);

  useEffect(() => {
    if (user && navigationRef.current) {
      navigationRef.current.navigate('HomePage');
    } else {
      navigationRef.current.navigate('SplashScreen');
    }
  }, [user]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false, // Hide the header for all screens
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Routes;
