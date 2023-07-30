import { useContext } from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';


type DbAccessProps={
    // name: string,
    // email:string,
    // contact:number,
    // address:string,
    // password:string,
    [key: string]: any,
    [key: number]: any,
}

export const registerUser = async ({
    name,
    email,
    contact,
    address,
    aadhar,
    services,
    password,
    userType
    }:DbAccessProps)=>{

    try {

        if(userType === "Consumer"){
          
            const {user} = await auth().createUserWithEmailAndPassword(email,password);

            const consumerData = {
                uid: user.uid,
                name,
                email,
                contact,
                address,
                password
            }
            
            await firestore().collection('consumer').doc(user.uid).set(consumerData);
           
        } else if(userType === "Provider"){

            const {user} = await auth().createUserWithEmailAndPassword(email,password);

            const providerData = {
                uid: user.uid,
                name,
                email,
                contact,
                address,
                aadhar,
                services,
                password
            }

            await firestore().collection('provider').doc(user.uid).set(providerData);

        }
    
      
    } catch (error:any) {
      
      if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
      console.error("Error:",error);
      
    }
}

