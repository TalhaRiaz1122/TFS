import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-url-polyfill/auto';

import store, {persistor} from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
