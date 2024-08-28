import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../components/Logo';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();

  const user = useSelector(state => state.user.user);
  useEffect(() => {
    if (user) {
      navigation.navigate('HomePage');
    } else {
      setTimeout(() => {
        navigation.navigate('LoginScreen');
      }, 2000);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={{marginVertical: 200}}>
        <Logo showLogo={true} showText={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
});

export default SplashScreen;
