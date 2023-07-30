import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
// import { connect } from 'react-redux'
// import { setUserType } from '../redux/actions';

const UserSelection = ({navigation}
    // ,userType,setUserType}
    :any) => {

    const {setUserType} = useAuth();

    const consumerHandlePress = ()=>{
        setUserType("Consumer")
        navigation.navigate("Signin")
    }
    const providerHandlePress = ()=>{
        setUserType("Provider")
        navigation.navigate("Signin")
    }

//     useEffect(() => {
//     if (userType) {
//       navigation.navigate('Signin');
//     // console.log(userType);
    
//     }
//   }, [userType, navigation]);

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={[styles.text,{color:"blue",fontSize:70,fontFamily:"times"}]}>Sahayak</Text>
        <Text style={[styles.text,{marginVertical:15}]}>Who would you like to Sign-in/Sign-up as...</Text>
        <View style={styles.buttonContainer}>
            <CustomButton 
                handlePress={consumerHandlePress} 
                bgDark='#33ffad' 
                bgLight='#b3ffe0' 
                text='Service Consumer' 
                description='Explore all the Services as a Customer here.' />

            <CustomButton 
                handlePress={providerHandlePress} 
                bgDark='#0066cc' 
                bgLight='#80bfff' 
                text='Service Provider' 
                description='Provide services to people as a Provider here.' />
        </View>
    </View>
  )
}

// const mapStateToProps = (state: any) => ({
//   userType: state.global.userType, // Access userType from the global state in the Redux store
// });

// const mapDispatchToProps = {
//   setUserType, // Add the setUserType action to mapDispatchToProps
// };

export default UserSelection
// export default connect(mapStateToProps,mapDispatchToProps)(UserSelection);

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        display:'flex',
        alignItems:"center",
        justifyContent:"center",
    },
    text:{
        fontSize: 15,
        color:"gray"
    },
    buttonContainer:{
        height: "20%",
        display:"flex",
        justifyContent:"space-evenly",
    },  
   
})