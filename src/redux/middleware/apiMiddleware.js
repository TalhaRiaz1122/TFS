import axios from 'axios';
import {BASE_URL} from '../constants';
import {logoutUser} from '../slices/userSlice';
import {Alert} from 'react-native';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const {store} = require('../store'); // Import the store dynamically to avoid circular dependencies
    if (error.response && error.response.status === 401) {
      // Token is expired, logout user and redirect to login
      store.dispatch(logoutUser());
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please log in again.',
      );

      const navigation = store.getState().navigation;
      if (navigation) {
        navigation.navigate('LoginScreen');
      }
    }
    return Promise.reject(error);
  },
);

export const apiMiddleware = store => next => async action => {
  if (action.type.startsWith('api/')) {
    const {url, method = 'GET', data, onSuccess, onError} = action.payload;

    try {
      const response = await apiClient({
        method,
        url: `${BASE_URL}${url}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.getState().user.user?.token}`, // Attach token if available
        },
      });

      if (onSuccess) {
        store.dispatch({type: onSuccess, payload: response.data});
      }
    } catch (error) {
      if (onError) {
        store.dispatch({
          type: onError,
          payload: error.response ? error.response.data : error.message,
        });
      }
    }
  } else {
    next(action);
  }
};

export default apiMiddleware;
