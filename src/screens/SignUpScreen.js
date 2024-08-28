import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {registerUser} from '../redux/slices/userSlice';
import Logo from '../components/Logo';
import theme from '../appTheme/theme'; // Import your theme
import supabase from '../services/supabaseClient';
import {authorizedEmails} from '../services/authorizedEmails';
// -------------------------
//in case if api of AuthorizedEmails is provided
//import { fetchAuthorizedEmails } from './services/authorizedEmails';
// -------------------------

const SignUpScreen = () => {
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
  //  handleSignUp using api

  // const handleSignUp = async values => {
  //   try {
  //     const userData = {
  //       email: values.email,
  //       mobile_number: values.mobile_number,
  //       password: values.password,
  //       password2: values.password2,
  //     };

  //     dispatch(registerUser(userData))
  //       .unwrap()
  //       .then(response => {
  //         Alert.alert('Registration Successful!');
  //         console.log('Token:', response.token.access);
  //         navigation.navigate('HomePage');
  //       })
  //       .catch(error => {
  //         Alert.alert('Registration Failed', error.message);
  //       });
  //   } catch (error) {
  //     console.error(error.message);
  //     Alert.alert('An error occurred during registration');
  //   }
  // };
  // -------------------------

  //  handleSignUp using supabase

  // const handleSignUp = async (values, setSubmitting) => {
  //   try {
  //     const {email, password} = values;

  //     // -------------------------
  //     // check for fethched emails through api
  //     // if (!(await isEmailAuthorized(email))) {
  //     //   Alert.alert(
  //     //     'Registration Failed',
  //     //     'This email is not authorized to sign up.',
  //     //   );
  //     //   return;
  //     // }
  //     // -------------------------

  //     if (!isEmailAuthorized(email)) {
  //       Alert.alert(
  //         'Registration Failed',
  //         'This email is not authorized to sign up.',
  //       );

  //       return;
  //     }

  //     const {error} = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       Alert.alert('Registration Failed', error.message);
  //       return;
  //     }

  //     Alert.alert(
  //       'Registration Successful!',
  //       'Please check your email to verify your account.',
  //     );
  //     navigation.navigate('LoginScreen');
  //   } catch (error) {
  //     console.error('Error during signup:', error.message);
  //     Alert.alert('An error occurred during registration');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSignUp = async (values, setSubmitting) => {
    try {
      const {email, password} = values;
      const {error} = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Registration Failed', error.message);
        return;
      }

      Alert.alert(
        'Registration Successful!',
        'Please check your email to verify your account.',
      );
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during signup:', error.message);
      Alert.alert('An error occurred during registration');
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      mobile_number: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      mobile_number: Yup.string()
        .matches(/^\d{11}$/, 'Must be exactly 11 digits')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: values => {
      handleSignUp(values);
    },
  });

  return (
    <View style={styles.container}>
      <Logo showLogo={true} showText={true} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

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
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          onChangeText={formik.handleChange('mobile_number')}
          onBlur={formik.handleBlur('mobile_number')}
          value={formik.values.mobile_number}
        />
        {formik.touched.mobile_number && formik.errors.mobile_number ? (
          <Text style={styles.errorText}>{formik.errors.mobile_number}</Text>
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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={formik.handleChange('password2')}
          onBlur={formik.handleBlur('password2')}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <Text style={styles.errorText}>{formik.errors.password2}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting}>
          <Text style={styles.buttonText}>
            {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInLink}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
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
    justifyContent: 'center',
  },
  formContainer: {
    marginVertical: 80,
    flex: 1,
    padding: 16,
    backgroundColor: theme.Colors.background,
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
  signInLink: {
    marginVertical: 25,
    alignItems: 'center',
  },
  signInText: {
    fontSize: theme.Typography.buttonText.fontSize,
    fontWeight: 'normal',
    fontFamily: theme.Typography.buttonText.fontFamily,
    color: theme.Colors.textPrimary,
  },
  errorText: {
    color: theme.Colors.error,
    fontSize: 12,
    marginBottom: 8,
  },
});

export default SignUpScreen;
