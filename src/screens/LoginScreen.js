import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/slices/userSlice';
import Logo from '../components/Logo';
import theme from '../appTheme/theme'; // Import your theme
import supabase from '../services/supabaseClient';
import {authorize} from 'react-native-app-auth';
import GoogleSignin from '../services/GoogleSignInConfig';
import {statusCodes} from '@react-native-google-signin/google-signin';
import {authorizedEmails} from '../services/authorizedEmails';
// -------------------------
//in case if api of AuthorizedEmails is provided
//import { fetchAuthorizedEmails } from './services/authorizedEmails';
// -------------------------

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isEmailAuthorized = email => authorizedEmails.includes(email);

  // -------------------------

  // const isEmailAuthorized = async email => {
  //   const authorizedEmails = await fetchAuthorizedEmails();
  //   return authorizedEmails.includes(email);
  // };

  // -------------------------

  // -------------------------
  // handleLogin through api call

  // const handleLogin = async (values, setSubmitting) => {
  //   try {
  //     const {email, password} = values;
  //     const resultAction = await dispatch(loginUser({email, password}));

  //     if (loginUser.fulfilled.match(resultAction)) {
  //       Alert.alert('Login Successful');
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           routes: [{name: 'HomePage'}],
  //         }),
  //       );
  //     } else if (loginUser.rejected.match(resultAction)) {
  //       const errorMessage = resultAction.error.message || 'Login failed';
  //       Alert.alert('Login Failed', errorMessage);
  //     }
  //   } catch (error) {
  //     Alert.alert('Login Error', error.message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // -------------------------

  // handleLogin through supabase

  // const handleLogin = async (values, setSubmitting) => {
  //   try {
  //     const {email, password} = values;

  //     // -------------------------
  //     // check for fethched emails through api
  //     // if (!(await isEmailAuthorized(email))) {
  //     //   Alert.alert('Login Failed', 'This email is not authorized to log in.');
  //     //   return;
  //     // }
  //     // -------------------------

  //     if (!isEmailAuthorized(email)) {
  //       Alert.alert('Login Failed', 'This email is not authorized to log in.');
  //       return;
  //     }

  //     const {error} = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       Alert.alert('Login Failed', error.message);
  //       return;
  //     }

  //     Alert.alert('Login Successful!');
  //     navigation.navigate('HomePage');
  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //     Alert.alert('An error occurred during login');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleLogin = async (values, setSubmitting) => {
    try {
      const {email, password} = values;
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      Alert.alert('Login Successful!');
      navigation.navigate('HomePage'); // Navigate to the home screen after successful login
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('An error occurred during login');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAfterLogin = data => {
    // Handle post-login actions
    console.log('User logged in:', data.user);
  };

  // -------------------------

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Check for Google Play Services
      const userInfo = await GoogleSignin.signIn(); // Perform the sign-in

      if (userInfo.idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });

        if (error) {
          Alert.alert('Error', error.message);
        } else {
          console.log('Login successful:', data);
          navigation.navigate('HomePage');
          handleAfterLogin(data);
        }
      } else {
        Alert.alert('Error', 'No ID token present!');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign-In cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available.');
      } else {
        console.error('An error occurred during Google Sign-In:', error);
      }
    }
  };

  // -------------------------

  // -------------------------

  const handleSlackLogin = async () => {
    try {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'slack_oidc',
        options: {
          redirectTo:
            'https://zwpneqpmqrtaajfqrnuy.supabase.co/auth/v1/callback',
        },
      });

      if (error) throw new Error(error.message);

      if (data && data.url) {
        Linking.openURL(data.url);
      } else {
        Alert.alert('Login Failed', 'Authentication URL is not available.');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  // -------------------------

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values, {setSubmitting}) => {
      handleLogin(values, setSubmitting);
    },
  });

  return (
    <View style={styles.container}>
      <Logo showLogo={true} showText={true} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting}>
          <Text style={styles.buttonText}>
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} onPress={googleLogin}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SlackButton} onPress={handleSlackLogin}>
          <Text style={styles.buttonText}>Login with slack</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.Colors.background,
  },
  formContainer: {
    flex: 1,
    marginTop: 130,
    //justifyContent: 'center',
  },
  title: {
    fontSize: theme.Typography.heading2.fontSize,
    fontWeight: theme.Typography.heading2.fontWeight,
    fontFamily: theme.Typography.heading2.fontFamily,
    color: theme.Typography.heading2.color,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderColor: theme.Colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.Colors.inputBackground,
    color: theme.Colors.inputText,
  },
  button: {
    backgroundColor: theme.Colors.buttonBackground,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.Typography.buttonText.color,
    fontSize: theme.Typography.buttonText.fontSize,
    fontWeight: theme.Typography.buttonText.fontWeight,
    fontFamily: theme.Typography.buttonText.fontFamily,
  },
  signupLink: {
    marginVertical: 25,
    alignItems: 'center',
  },
  signupText: {
    fontSize: theme.Typography.buttonText.fontSize,
    fontWeight: 'normal',
    fontFamily: theme.Typography.buttonText.fontFamily,
    color: theme.Colors.textPrimary,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  SlackButton: {
    backgroundColor: '#e01563',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;
