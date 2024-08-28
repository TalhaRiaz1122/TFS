import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import theme from '../appTheme/theme'; // Import your theme

const Logo = ({
  showLogo = true,
  showText = true,
  logoWidth = 200,
  logoHeight = 50,
  text,
}) => {
  return (
    <View style={styles.container}>
      {showLogo && (
        <Image
          source={require('../assets/images/logo.png')}
          style={[styles.logo, {width: logoWidth, height: logoHeight}]}
        />
      )}
      {showText && (
        <Text style={styles.welcomeText}>{text || 'Welcome to TFS'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 100,
  },
  logo: {
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: theme.Typography.body.fontSize, // Use theme font size
    fontWeight: theme.Typography.body.fontWeight, // Use theme font weight
    fontFamily: theme.Typography.body.fontFamily, // Use theme font family
    color: theme.Colors.textPrimary, // Use theme text color
    marginTop: 2,
  },
});

export default Logo;
