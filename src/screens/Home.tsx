import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Home = () => {

  const {user,setUser,userType} = useAuth();

  const logout = async ()=>{
    try {
      if(user){
      await auth().signOut().then(()=>{
        Alert.alert('signed out!')
        
      })
      await GoogleSignin.isSignedIn() ? GoogleSignin.signOut(): null
      setUser(null);
    }else{
      Alert.alert("No User.")
    }
    } catch (error) {
      Alert.alert('User sign out Failed!')
    }
  }

  return (
    <View>
      <Text style={{color:"#000000"}}>Home</Text>
      <Text style={{color:"#000000"}}>{user?.uid}</Text>
      <Text style={{color:"#000000"}}>{userType}</Text>
      <CustomButton 
        handlePress={logout} 
        bgDark='orange' 
        bgLight='#b3ffe0' 
        text='Logout' 
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})