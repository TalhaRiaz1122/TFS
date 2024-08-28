import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../components/Logo';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {logoutUser} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import theme from '../appTheme/theme'; // Import your theme
import {setNavigation} from '../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons
import supabase from '../services/supabaseClient';

const HomePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //logout using redux api

  // useEffect(() => {
  //   setNavigation(navigation);
  // }, [navigation]);

  // // Function to handle logout
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };
  //logout using supabase

  const handleLogout = async () => {
    try {
      const {error} = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Logout Failed', error.message);
        return;
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
      Alert.alert('Logout Successful');
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert('An error occurred during logout');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.Colors.background}}>
      <View style={[styles.header]}>
        <Logo showLogo={true} showText={false} />

        <Text style={theme.Typography.heading1}>Welcome to The First Sol</Text>
        <Text style={theme.Typography.subheading}>
          Innovative Solutions for a Modern World
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[theme.Typography.heading2, {flex: 1}]}>
            Our Services
          </Text>
          <Icon name="cogs" size={24} color={theme.Colors.iconColor} />
        </View>
        <Text style={theme.Typography.body}>
          At The First Sol, we specialize in delivering cutting-edge software
          solutions tailored to your needs.
        </Text>
        <View style={styles.serviceList}>
          <View style={styles.serviceItem}>
            <Text style={theme.Typography.subheading}>
              Custom Software Development
            </Text>
            <Text style={theme.Typography.body}>
              Build tailored software solutions to meet your business needs.
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={theme.Typography.subheading}>
              Mobile App Development
            </Text>
            <Text style={theme.Typography.body}>
              Create high-performance mobile applications for iOS and Android.
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={theme.Typography.subheading}>Web Development</Text>
            <Text style={theme.Typography.body}>
              Design and develop responsive and user-friendly websites.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[theme.Typography.heading2, {flex: 1}]}>
            Our Projects
          </Text>
          <Icon name="rocket" size={24} color={theme.Colors.iconColor} />
        </View>
        <Text style={theme.Typography.body}>
          Explore some of our successful projects that showcase our expertise
          and innovation.
        </Text>
        <TouchableOpacity
          style={theme.Components.button}
          onPress={() => alert('View Projects')}>
          <Text style={theme.Typography.buttonText}>View Projects</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[theme.Typography.heading2, {flex: 1}]}>Contact Us</Text>
          <Icon name="envelope" size={24} color={theme.Colors.iconColor} />
        </View>
        <Text style={theme.Typography.body}>
          Get in touch with us to discuss your project or learn more about our
          services.
        </Text>
        <TouchableOpacity
          style={theme.Components.button}
          onPress={() => alert('Contact Us')}>
          <Text style={theme.Typography.buttonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[
            theme.Components.button,
            {backgroundColor: theme.Colors.logoutButtonBackground},
          ]}
          onPress={handleLogout}>
          <Text style={theme.Typography.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  section: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: theme.Colors.background,
    borderRadius: 8,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: {width: 0, height: 2}, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceList: {
    marginVertical: 8,
  },
  serviceItem: {
    marginBottom: 12,
  },
});

export default HomePage;
