import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
// import { connect } from 'react-redux';
// import { setUserType, setLoading } from '../redux/actions'; // Import the Redux actions

import { CustomFormContainer, CustomFormField } from '../components/CustomFormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// interface Props {
//   navigation: any;
//   userType: string;
//   loading: boolean;
//   setLoading: (loading: boolean) => void;
  
// }

const SigninScreen = ({navigation}
  // userType,
  // loading,
  // setLoading}
  :any) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorText,setErrorText] = useState("");

  const {userType,setLoading,loading,user} = useContext(AuthContext);
  

  const handleSignupPress = ()=>{
    if (userType === "Consumer") {
      navigation.navigate("ConsumerSignup")
    }else if(userType === "Provider"){
      navigation.navigate("ProviderSignup")
    }
  }

  const handleSubmit = async ()=>{
    setErrorText("");
    
    if( !user && userType && email && password){
      setLoading(true);
      try {      
        await auth().signInWithEmailAndPassword(email,password)

        setEmail("")
        setPassword("")
        setLoading(false);
      } catch (error:any) {
        setLoading(false)
        if (error.code === 'auth/email-already-in-use') {
          setErrorText("That email address is already in use!");
        }else if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
          setErrorText('That email address or password is invalid!');
        }else if(error.code === "auth/user-not-found"){
          setErrorText("User not found, Please check your Credentials!");
        }else{
          setErrorText(error.code.toString())
        }
      }
    }else{
      setErrorText("Please fill all fields!")
      setLoading(false);
    }
  }

  const handleGoogleSignin = async ()=>{
  
  try {
    await GoogleSignin.hasPlayServices();
  
    const {user,idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
    const u = await auth().signInWithCredential(googleCredential);
    const uid = u.user.uid
    const name = user.name;
    const email = user.email;
    const contact = u.user?.phoneNumber ?? "0000000000";
    const address = "Signed in using google."
    const password = ""
    const consumerData = {
      uid,
      name,
      email,
      contact,
      address,
      password
    }
    await firestore().collection('consumer').doc(u.user.uid).set(consumerData);
  } catch (error:any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("User canceled the sign-in.")
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("User sign-in In progress.")
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert("Google Play Services not available.")
    } else {
      console.log(error);
    
    }
  }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{userType}</Text>
      <Text style={[styles.text,{color:"blue",fontSize:70,fontFamily:"times"}]}>
        Sahayak
      </Text>
      <Text style={styles.text}>Sign-in</Text>

      <CustomFormContainer 
        handlePress={handleSignupPress} 
        text='Sign-up' 
        btnText='Sign-in' 
        accountText='Dont have an account?' 
        handleSubmit={handleSubmit} 
        loading={loading} 
        handleGoogleSignin={handleGoogleSignin}
      >
        <CustomFormField setState={setEmail} state={email} text='Username/Email' placeHolderText='johnDoe@example.com'/>
        <CustomFormField setState={setPassword} state={password} text='Password' placeHolderText='JohnDoe@123' secureText={true} />
        {errorText ? <Text style={{color:"red"}} >{errorText}</Text>:null}     
      </CustomFormContainer>

    </View>
  )
}

// const mapStateToProps = (state: any) => ({
//   userType: state.global.userType,
//   loading: state.global.loading,
// });

// const mapDispatchToProps = {
//   setUserType,
//   setLoading,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen)
export default SigninScreen

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#ffffff",
  },
  text:{
        fontSize: 30,
        color:"gray"
    },
})