import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React,{useContext} from 'react'
import CustomButton from './CustomButton'
import { AuthContext } from '../context/AuthContext';
import {
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

type SigninFormProps = {
    setState: (value: string)=>void,
    state: string ,
    text: string,
    placeHolderText: string,
    keyboardType?:any,
    secureText?:boolean,
    textArea?:boolean,
    maxLength?:number
}
export const CustomFormField = ({setState,state,text,placeHolderText,keyboardType,secureText=false,textArea=false,maxLength}:SigninFormProps)=>{
    return(
    <>
        <Text style={[styles.text,{fontSize:15}]}>{text} *</Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={setState}
          value={state}
          placeholder={placeHolderText}
          placeholderTextColor="#b3b3b3"
          keyboardType= {keyboardType}
          secureTextEntry = {secureText}
          multiline = {textArea}
          numberOfLines={textArea ? 4 : 1}
          maxLength={maxLength}
        />
      </>
      )
}

type CustomFormContainerProps = {
    handlePress: ()=>void,
    text:string,
    children:any,
    btnText:string,
    accountText:string,
    handleSubmit:()=>void,
    loading:boolean,
    handleGoogleSignin?:()=>void,
    // styles: object
}
export const CustomFormContainer: React.FC<CustomFormContainerProps> = ({handlePress,text,children,btnText,accountText,handleSubmit,loading,handleGoogleSignin})=>{
  
  const {userType} = useContext(AuthContext);
  
  return(
   <View style={styles.form}>
    <ScrollView>
        {children}

        <CustomButton 
            handlePress={handleSubmit} 
            bgDark='#33ffad' 
            bgLight='#b3ffe0' 
            text={btnText} 
            loading={loading}/>

        {userType === "Consumer" && 
          <GoogleSigninButton 
            onPress={handleGoogleSignin} 
            color={GoogleSigninButton.Color.Dark}
            size={GoogleSigninButton.Size.Icon}
            style={{width:"90%",alignSelf:"center"}}/>
        }

        <Text style={[styles.text,{fontSize:15,marginTop:15}]}>
          {accountText} <Pressable onPress={handlePress} >
             <Text style={{color:"#000000"}}>
              {text}
             </Text> 
          </Pressable>
        </Text>
        </ScrollView>
      </View>
      )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 30,
        color:"gray"
    },
    form:{
      backgroundColor:"#e6e6e6",
      margin:10,
      padding:10,
      width:"90%",
      height:"auto",
      borderRadius:15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.6,
      shadowRadius: 15,
      elevation: 5,
      maxHeight:"80%"
    },
    textInput:{
      backgroundColor:"#ffffff",
      marginVertical:10,
      paddingHorizontal:10,
      borderRadius:10,
      color:"#4d4d4d",
    }
})