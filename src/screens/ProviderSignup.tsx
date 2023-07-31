import {StyleSheet, Text, View,Alert } from 'react-native'
import React,{useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { CustomFormContainer, CustomFormField } from '../components/CustomFormField';

import { registerUser } from '../firebase/DbAccess';
import Validator from '../components/Validator';

const ProviderSignup = ({navigation}:any):React.JSX.Element => {
  
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [contact,setContact] = useState("");
  const [address,setAddress] = useState("");
  const [aadhar,setAadhar] = useState("");
  const [services,setServices] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [errorText,setErrorText] = useState("");

  const {userType,setLoading,loading,user} = useContext(AuthContext);

  const handleTextChange = (text: string) => {
    // Remove any existing hyphens and non-digit characters
    const cleanedText = text.replace(/-/g, '').replace(/\D/g, '');

    // Insert hyphens after every 4 digits
    let formattedValue = '';
    for (let i = 0; i < cleanedText.length; i += 4) {
      const segment = cleanedText.substring(i, i + 4);
      if (segment) {
        formattedValue += segment;
        if (i + 4 < cleanedText.length) {
          formattedValue += '-';
        }
      }
    }

    setAadhar(formattedValue);
  };

  const handleSignInPress = ()=>{
      navigation.navigate("Signin")
  }

  const handleSubmit = async ()=>{
    setErrorText("");
    
    if(password === confirmPassword){
      if(name && email && contact && address && aadhar && services && password && userType){
        setLoading(true);
        const userData ={
          name,
          email,
          contact,
          address,
          aadhar,
          services,
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
            setAadhar("");
            setServices("");
            setPassword("");
            setConfirmPassword("");      
            setLoading(false);
        })
        }else{
          setErrorText(valid);
        }

      // setLoading(false);
      }else{
        // setLoading(false)
        setErrorText("Please fill all field's!")
      }
    }else{
      // setLoading(true);
      setErrorText("Password does not match!")
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={[styles.text,{color:"blue",fontSize:60,fontFamily:"times"}]}>
        Sahayak
      </Text>
      <Text style={[styles.text,{fontSize:20}]}>Provider Sign-up</Text>

    
      <CustomFormContainer handlePress={handleSignInPress} text='Sign-in' btnText='Sign-up' accountText='Already have an account?' handleSubmit={handleSubmit} loading={loading}>
        <CustomFormField setState={setName} state={name} text='Name (as per Aadhar)' placeHolderText='john Doe'/>
        <CustomFormField setState={setEmail} state={email} text='EmailID' placeHolderText='johnDoe@example.com' />
        <CustomFormField setState={setContact} state={contact} text='Contact No.' placeHolderText='9874321234' keyboardType="number-pad" maxLength={10} />
        <CustomFormField setState={setAddress} state={address} text='Address' placeHolderText='some flat No.3, some area, near some landmark, city, state, pin.' textArea={true}/>
        <CustomFormField setState={handleTextChange} state={aadhar} text='Aadhar No.' placeHolderText='0000-0000-0000' keyboardType="number-pad" maxLength={14}/>
        <CustomFormField setState={setServices} state={services} text='Services' placeHolderText='Plumber'/>
        <CustomFormField setState={setPassword} state={password} text='Password' placeHolderText='JohnDoe@123' secureText={true} />
        <CustomFormField setState={setConfirmPassword} state={confirmPassword} text='Confirm Password' placeHolderText='JohnDoe@123' secureText={true} />
        {errorText ? <Text style={{color:"red"}}>{errorText}</Text>:null}
      </CustomFormContainer>
   
    </View>
  )
}

export default ProviderSignup

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