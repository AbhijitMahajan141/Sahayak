import { StyleSheet, Text, View,ScrollView,SafeAreaView,ActivityIndicator, FlatList  } from 'react-native'
import React,{useEffect,useState} from 'react'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { getProviders } from '../firebase/DbAccess';
import { useAuth } from '../context/AuthContext';
import CustomButton from './CustomButton';

const ShowProviders = () => {

    const {loading,setLoading} = useAuth();
    const [providersList, setProvidersList] = useState<FirebaseFirestoreTypes.DocumentData>([]);

    useEffect(() => {
        setLoading(true);
        getProviders().then((allProviders)=>{
            {allProviders && setProvidersList(allProviders)}
            setLoading(false)
        })
        
    }, [])
    
    const viewDetails = () => {}

  return (
    <SafeAreaView  style={styles.container}>
      <Text style={[styles.text,{color:"blue",fontSize:60,fontFamily:"times"}]}>
        Sahayak
      </Text>
      <Text style={styles.text}>How can we help you today?</Text>
      <View style={styles.scrollViewContainer}>
        <Text style={{color:"#000000",fontSize:25,alignSelf:"center",marginBottom:15}}>Service Providers</Text>
        {!loading ?
           <ScrollView>
                {
                    providersList.map((data:any)=>(
                        <View key={data.id} style={styles.cards}>
                            <Text style={{color:"#000000",fontSize:25}}>{data.name}</Text>
                            { data.services? <Text style={{color:"gray",fontSize:20}}>{data.services.join(', ')}</Text>:""}
                            <Text style={{color:"gray"}}>{data.email}</Text>
                            <Text style={{color:"gray"}}>+91 {data.contact}</Text>
                            <Text style={{color:"gray"}}>{data.address}</Text>
                            <CustomButton 
                              handlePress={viewDetails} 
                              bgDark='#1a66ff' 
                              bgLight='#6699ff' 
                              text='Contact' 
                            />
                        </View>
                    ))
                }
           </ScrollView>
            :
            <ActivityIndicator size="large" color="blue" />
        }
      </View>
    </SafeAreaView>
  )
}

export default ShowProviders

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
        color:"gray",
        
  },
  scrollViewContainer:{
    width:"90%",
    height:"80%",
    marginTop:20,
    backgroundColor:"#e6e6e6",
    borderRadius:30,
    padding:20,
    elevation:5
  },
  cards:{
    backgroundColor:"#ffffff",
    padding:10,
    borderRadius:15,
    marginBottom:10
  }
})