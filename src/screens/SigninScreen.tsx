import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
// import { connect } from 'react-redux';
// import { setUserType, setLoading } from '../redux/actions'; // Import the Redux actions

import { CustomFormContainer, CustomFormField } from '../components/CustomFormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { googleSignin } from '../firebase/DbAccess';
import Snackbar from 'react-native-snackbar';

const SigninScreen = ({navigation}:any) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorText,setErrorText] = useState("");

  const {userType,setLoading,loading,user} = useContext(AuthContext);

  const handleSignupPress = ()=>{
    if (userType === "Consumer") {
      navigation.navigate("ConsumerSignup")
      setEmail("")
      setPassword("")
      setErrorText("")
    }else if(userType === "Provider"){
      navigation.navigate("ProviderSignup")
      setEmail("")
      setPassword("")
      setErrorText("")
    }
  }

  const handleSubmit = async ()=>{
    setErrorText("");
    
    if( !user && userType && email && password){
      setLoading(true);
      try {
        const data = await firestore().collection('users').where('email',"==",email).where('role','==',userType).get();
        if(!data.empty){
          await auth().signInWithEmailAndPassword(email,password);
        }else{
          setErrorText(`User is not registered as: ${userType}`)
        }
        
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
    
    {userType && 
      googleSignin(userType).then((message)=>
      {
        message &&
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_LONG,
          // marginBottom:10,

        })
      })
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