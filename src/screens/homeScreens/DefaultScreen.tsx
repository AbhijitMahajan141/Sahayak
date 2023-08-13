import {View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext';
import ShowProviders from '../../components/ShowProviders';
import ShowAdverts from '../../components/ShowAdverts';

const DefaultScreen = () => {

  const {user,userType} = useAuth();

  return (
    <View>
      {
        userType === "Consumer" ? <ShowProviders/> : userType === "Provider" && <ShowAdverts/>
      }
    
    </View>
  )
}

export default DefaultScreen

