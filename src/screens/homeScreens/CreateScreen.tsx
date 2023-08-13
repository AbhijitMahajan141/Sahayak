import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { CustomFormContainer, CustomFormField } from '../../components/CustomFormField'
import { Dropdown } from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { createAdvert } from '../../firebase/DbAccess';
const data = [
    { label: 'Open for all', value: 'OpenForAll' },
    { label: 'Car Wash', value: 'carWash' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Electrcian', value: 'Electrcian' },
    { label: 'Item 5', value: '5' },
    
  ];

const CreateScreen = () => {

  const [service,setServices] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [errorText,setErrorText] = useState("");

  const {user,setLoading,loading} = useContext(AuthContext);

  const handleCreatePress = () => {
      setErrorText("");
      if(service && description && price && address && user){
        setLoading(true);
        const advertData ={
          user,
          service,
          description,
          price,
          address
        }
      
        
        const message = createAdvert(advertData).then(()=>{
          Snackbar.show({text:"Advert Created Successfully!",duration:Snackbar.LENGTH_LONG,})
          setServices("")
          setDescription("")
          setPrice("")
          setAddress("")
          setLoading(false);
        })
        {message ?? Snackbar.show({text:message,duration:Snackbar.LENGTH_LONG})}
      }else{
        setLoading(false);
        setErrorText("Please fill all fields!")
      }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text,{color:"blue",fontSize:60,fontFamily:"times"}]}>
        Sahayak
      </Text>
      <Text style={styles.text}>Post an Advert here...</Text>
      <View style={styles.advertContainer}>
        
        <Text style={styles.text}>Services *</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={service}
          onChange={item => {
            setServices(item.value);
          }}
          
          // selectedStyle={styles.selectedStyle}
          itemTextStyle={{color:"gray"}}
        />
        <CustomFormField setState={setDescription} state={description} text='Description' placeHolderText='Describe the work here.' textArea={true} />
        <CustomFormField setState={setPrice} state={price} text='Base Price' placeHolderText='Eg.200' keyboardType="number-pad"  />
        <CustomFormField setState={setAddress} state={address} text='Address' placeHolderText='some flat No.3, some area, near some landmark, city, state, pin.' textArea={true}/>
        
        {errorText ? <Text style={{color:"red"}}>{errorText}</Text>:null}
        <CustomButton 
          handlePress={handleCreatePress} 
          bgDark='#33ffad' 
          bgLight='#b3ffe0' 
          text="Create Advert" 
          loading={loading}
        />
      </View>
    </View>
  )
}

export default CreateScreen

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
    marginTop:5
  },
  dropdown: {
    height: 50,
    backgroundColor: '#ffffff',
    marginVertical:10,
    borderRadius:10,
    padding:10,
    },
  placeholderStyle: {
    fontSize: 16,
    color:"#b3b3b3"
  },
  selectedTextStyle: {
    fontSize: 14,
    color:"gray"
  },
  advertContainer: {
    backgroundColor:"#e6e6e6",
    margin: 20,
    padding: 20,
    borderRadius: 15
  }
})