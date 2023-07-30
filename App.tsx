import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Navigation from './src/components/Navigation';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
      // webClientId: process.env.REACT_APP_WEB_API_ID,
      scopes: ['profile', 'email'],
      webClientId: "",
      offlineAccess: true,
    });
// console.log(process.env.REACT_APP_WEB_API_ID);


const App: React.FC = () => {

  return (
    <SafeAreaView style={styles.root}>
      <AuthProvider>
      {/* <Provider store={store}> */}
        <Navigation/>
      {/* </Provider> */}
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
    backgroundColor:"#ffffff",
    width:"100%",
    height:"100%",
  }
});

export default App;
