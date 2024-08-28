// import {configureStore} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import userReducer from './slices/userSlice';
// import verificationReducer from './slices/verificationSlice';
// import apiMiddleware from './middleware/apiMiddleware';

// // Persist configuration for user slice
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['user'], // Only persist the user slice
// };

// // Persisted reducer
// const persistedUserReducer = persistReducer(persistConfig, userReducer);

// const store = configureStore({
//   reducer: {
//     user: persistedUserReducer,
//     verification: verificationReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({serializableCheck: false}).concat(apiMiddleware),
// });

// export const persistor = persistStore(store);

// export default store;

import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import verificationReducer from './slices/verificationSlice';
import apiMiddleware from './middleware/apiMiddleware';

// Persist configuration for user slice
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // Only persist the user slice
};

// Persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    verification: verificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(apiMiddleware),
});

export const persistor = persistStore(store);

// Add a method to set the navigation ref in the store
export const setNavigation = navigation => {
  store.dispatch({type: 'SET_NAVIGATION', payload: navigation});
};

export default store;
