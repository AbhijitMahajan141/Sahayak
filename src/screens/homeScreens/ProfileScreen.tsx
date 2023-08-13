import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getProfile } from '../../firebase/DbAccess';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

const ProfileScreen = () => {

  const {user,setUser,userType,setLoading,loading} = useAuth();

  const [usersData, setUsersData] = useState<FirebaseFirestoreTypes.DocumentData>([])

  const logout = async ()=>{
    try {
      if(user){
      await auth().signOut().then(()=>{
        Snackbar.show({text:'Signed out!',duration:Snackbar.LENGTH_LONG})
      })
      await GoogleSignin.isSignedIn() ? GoogleSignin.signOut(): null
      setUser(null);
    }else{
      Snackbar.show({text:'No User!',duration:Snackbar.LENGTH_LONG})
    }
    } catch (error) {
      Snackbar.show({text:'User Signout failed!',duration:Snackbar.LENGTH_LONG})
    }
  }

  useEffect(() => {
    setLoading(true);
    if( user && user.uid){
      getProfile(
        user.uid,
        (usersData)=>{setUsersData(usersData);setLoading(false);});
    }
    
  },[user]) 

  return (
    <View style={styles.container}>
      <Text style={[styles.text,{color:"blue",fontSize:60,fontFamily:"times"}]}>
        Sahayak
      </Text>
      <Text style={[styles.text,{fontSize:30,marginBottom:20}]}>Your Profile</Text>

      {!loading ?
        <View>
        <Text style={{color:"#000000"}}>{usersData.name}</Text>
        <Text style={{color:"#000000"}}>{usersData.email}</Text>
        <Text style={{color:"#000000"}}>{usersData.contact}</Text>
        <Text style={{color:"#000000"}}>{usersData.address}</Text>
        {userType === "Provider" && usersData.services ? 
          <>
            <Text style={{color:"#000000"}}>{usersData.aadhar}</Text>
            <Text style={{color:"#000000"}}>{usersData.services.join(', ')}</Text>
          </>
          :
          null
        }
        <Text style={{color:"#000000"}}>{usersData.password}</Text>
        
        </View>
        :
        <ActivityIndicator size="large" color="blue" />
      }
      <CustomButton 
          handlePress={logout} 
          bgDark='red' 
          bgLight='orange' 
          text='Logout' 
        />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
    height:"auto",
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",          
  },
  text:{
        fontSize: 15,
        color:"gray"
  },
    
})