import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';


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
    userType,
    }:DbAccessProps)=>{

    try {
        let uid;
        let consumerData;
        if(userType === "Consumer"){
            const {user} = await auth().createUserWithEmailAndPassword(email,password);
            uid = user.uid;
            consumerData = {
                uid: user.uid,
                role: userType,
                name,
                email,
                contact,
                address,
                password
            }
        //     await firestore().collection('consumer').doc(user.uid).set(consumerData);
        // //    return user.uid;
        } else if(userType === "Provider"){
            const {user} = await auth().createUserWithEmailAndPassword(email,password);
            uid = user.uid;
            consumerData = {
                uid: user.uid,
                role: userType,
                name,
                email,
                contact,
                address,
                aadhar,
                services,
                password
            }
        }
        {consumerData && 
        await firestore().collection('users').doc(uid).set(consumerData);
        }
    
      
    } catch (error:any) {
      
      if (error.code === 'auth/email-already-in-use') {
      return('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      return('That email address is invalid!');
    }
      console.error("registerUser:",error);
      
    }
}


export const getProfile = async (
    
    user:string,
    onDataFetched:(usersData: FirebaseFirestoreTypes.DocumentData)=> void
    ) => {

        try {
        //    let snapshot;
            // if(userType === "Consumer"){
                
        const snapshot = await firestore().collection('users').doc(user).get();
                // const usersData = snapshot.data();
                // if(usersData){
                //     onDataFetched(usersData);
                // }
                
            // }else if(userType === "Provider"){
                // snapshot = await firestore().collection('provider').doc(user).get();
                
            // }else{
                // return "Something went wrong!"
            // }            
            const usersData = snapshot.data();
                if(usersData){
                    onDataFetched(usersData);
                }
        } catch (error) {
            console.error("getProfile error:",error);
        }
}

export const googleSignin = async (userType:string) => {
    
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
          role:userType,
          name,
          email,
          contact,
          address,
          password
        }
        await firestore().collection('users').doc(u.user.uid).set(consumerData);
    
  } catch (error:any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return("User canceled the sign-in.")
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("User sign-in In progress.")
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return("Google Play Services not available.")
    } else {
      console.error("googleSignin error:",error);
    }
  }
}

interface Provider {
  id: string;
  name: string;
  email: string;
  contact: number,
  address: string,
  aadhar: number,
  services: string,
  role: string;
}

export const getProviders = async () => {
  try {
    const allProviders:Provider[] = []
    const querySnapshot = await firestore().collection('users').where('role','==','Provider').get();
    
    querySnapshot.docs.map((doc)=>{
      allProviders.push({
        id:doc.id,
        ...doc.data(), 
      }as Provider);
    })

     return(allProviders)
    
  } catch (error) {
    console.error("GetProviders error:",error);
  }
}

export const createAdvert = async ({
  user,
  service,
  description,
  price,
  address
}:any) => {
  try {
    const u = user.uid;
    const advertData = {
      user: u,
      service,
      description,
      price,
      address
    }

      
    // {advertData && 
      await firestore().collection('adverts').doc(u)
      .get()
      .then((docSnapshot) => {
      if (docSnapshot.exists) {
      // Document exists, update the array field
        firestore().collection('adverts')
        .doc(u)
        .update({
          arrayField: firestore.FieldValue.arrayUnion(advertData),
        })
        .then(() => {
          return('Data added to the array successfully');
        })
        .catch((error) => {
          return(`Error adding data: ${error} `);
        });
    } else {
      // Document doesn't exist, create a new document with the array field
        firestore().collection('adverts')
        .doc(u)
        .set({
          arrayField: [advertData], // Create a new array with the newData
        })
        .then(() => {
          return('New document with array field created successfully');
        })
        .catch((error) => {
          return(`Error creating new document: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error('Error checking document existence:', error);
  });
  } catch (error) {
    return(error)
  }
}

export const getAdverts = async () => {
  try {
    const allProviders:any = []
    await firestore().collection('adverts').get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        const data = doc.data();
        if(data.arrayField && Array.isArray(data.arrayField)){
          data.arrayField.forEach((arrayItem)=>{
            // console.log(arrayItem);
            allProviders.push({
              arrayItem
            })
          })
        }
      })
    })
    .catch((error) => {
    console.error('Error fetching collection:', error);
  });
  if(allProviders){
    return(allProviders)
  }else{
    return("All providers Empty!.")
  }
    // querySnapshot.docs.map((doc)=>{
    //   const data = doc.data();
    //   const dataArray:{id: string;[key:string]:any}[] = []

    //   data.arrayField.forEach((nestedObject:{[key:string]:any})=>{
    //     dataArray.push({id: doc.id, ...nestedObject})
    //   })
    //   console.log(dataArray);
      
    //   // allProviders.push({
    //   //   id:doc.id,
    //   //   ...doc.data(), 
    //   // }as Provider);
    // })

    // console.log(allProviders);
    

    //  return(allProviders)
    
  } catch (error) {
    console.error("GetProviders error:",error);
  }
}