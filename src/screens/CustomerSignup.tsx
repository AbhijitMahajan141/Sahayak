import { StyleSheet, Text, View,Alert } from 'react-native'
import React, { useState,useContext } from 'react'
import { CustomFormContainer, CustomFormField } from '../components/CustomFormField';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../firebase/DbAccess';
import Validator from '../components/Validator';

const CustomerSignup = ({navigation}:any):React.JSX.Element => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [contact,setContact] = useState("");
  const [address,setAddress] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [errorText,setErrorText] = useState("");

  const {userType,setLoading,loading} = useContext(AuthContext);

  const handleSignInPress = ()=>{
      navigation.navigate("Signin")
  }

  const handleSubmit = async ()=>{
    setErrorText("");
    setLoading(true);
    console.log("1:",loading);
    if(password === confirmPassword){
      if(name && email && contact && address && password && userType){

      const userData ={
        name,
        email,
        contact,
        address,
        password,
        userType
      }

      const valid = Validator(userData);

      if(valid === true){
        registerUser(userData).then(()=>{
          Alert.alert("Sign-up Successful!!!")
          setName("");
          setEmail("");
          setContact("");
          setAddress("");
          setPassword("");
          setConfirmPassword("");
          setErrorText("");
      })
      }else{
        setErrorText(valid);
      }
      
      setLoading(false);
      console.log("2:",loading);
      }else{
        setLoading(false)
        console.log("3:",loading);
        setErrorText("Please fill all field's!")
      }
    }else{
      setLoading(false)
      console.log("4:",loading);
      setErrorText("Password does not match!")
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={[styles.text,{color:"blue",fontSize:60,fontFamily:"times"}]}>
        Sahayak
      </Text>
      <Text style={[styles.text,{fontSize:20}]}>Consumer Sign-up</Text>

      <CustomFormContainer handlePress={handleSignInPress} text='Sign-in' btnText='Sign-up' accountText='Already have an account?' handleSubmit={handleSubmit} loading={loading}>
        <CustomFormField setState={setName} state={name} text='Name (as per Aadhar)' placeHolderText='john Doe'/>
        <CustomFormField setState={setEmail} state={email} text='Email' placeHolderText='johnDoe@example.com'/>
        <CustomFormField setState={setContact} state={contact} text='Contact No.' placeHolderText='9874321234' keyboardType="number-pad" maxLength={10}/>
        <CustomFormField setState={setAddress} state={address} text='Address' placeHolderText='some flat No.3, some area, near some landmark, city, state, pin.' textArea={true}/>
        <CustomFormField setState={setPassword} state={password} text='Password' placeHolderText='JohnDoe@123' secureText={true} />
        <CustomFormField setState={setConfirmPassword} state={confirmPassword} text='Confirm Password' placeHolderText='JohnDoe@123' secureText={true} />
        {errorText ? <Text style={{color:"red"}}>{errorText}</Text>:null}
      </CustomFormContainer>

    </View>
  )
}

export default CustomerSignup

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"flex-start",
    backgroundColor:"#ffffff",
  },
  text:{
        fontSize: 15,
        color:"gray"
    },
})