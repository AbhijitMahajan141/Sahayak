import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {  useAuth } from '../context/AuthContext';

import UserSelection from '../screens/UserSelection';
import CustomerSignup from '../screens/CustomerSignup';
import ProviderSignup from '../screens/ProviderSignup';
import SigninScreen from '../screens/SigninScreen';
import BottomTabNavigator from './BottomTabNavigator';

// Create Stack Navigator
const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {

  const {user,userType} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user && userType ? 'Home' : 'Welcome'}>
        {user && userType ? (
          // <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={BottomTabNavigator} options={{headerShown: false}} />
          ):
          (
          <>
            <Stack.Screen
              name="Welcome"
              component={UserSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ConsumerSignup" component={CustomerSignup} options={{ headerShown: false }} />
            <Stack.Screen name="ProviderSignup" component={ProviderSignup} options={{ headerShown: false }} />
        </>
        )}
        
        {/* <Stack.Screen
          name="ConsumerHome"
          component={ConsumerHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProviderHome"
          component={ProviderHomeScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
