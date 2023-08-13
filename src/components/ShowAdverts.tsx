import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import { useAuth } from '../context/AuthContext';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getAdverts } from '../firebase/DbAccess';

const ShowAdverts = () => {
  const {loading,setLoading} = useAuth();
  const [advertList, setAdvertList] = useState<FirebaseFirestoreTypes.DocumentData>([]);

  const viewDetails = () => {
    
  }

  useEffect(() => {
        setLoading(true);
        getAdverts()
        .then((allAdverts)=>{
            {allAdverts && setAdvertList(allAdverts)}
            setLoading(false)
        })
        
    }, [])

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
                    advertList.map((data:any)=>(
                        <View key={Math.random()} style={styles.cards}>{/* Give unique key */}
                            <Text style={{color:"#000000",fontSize:25}}>{data.arrayItem.service}</Text>
                            <Text style={{color:"gray",fontSize:20}}>{data.arrayItem.description}</Text>
                            <Text style={{color:"gray"}}>{data.arrayItem.price}</Text>
                            <Text style={{color:"gray"}}>{data.arrayItem.address}</Text>
                            
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

export default ShowAdverts

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