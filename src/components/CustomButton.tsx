import { Button, StyleSheet, Text, View,Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    handlePress: () => void,
    bgDark: string,
    bgLight: string,
    text: string,
    description?: string,
    loading?:boolean
}

const CustomButton = ({handlePress,bgDark,bgLight,text,description,loading}:CustomButtonProps) => {
  return (
    <Pressable 
            onPress={handlePress}
                style={({pressed})=>[
                    {
                        // backgroundColor: pressed ? '#b3ffe0' : '#33ffad',
                        backgroundColor: pressed ? bgLight : bgDark,
                    },
                    styles.serviceContainer
                ]}
                disabled={loading}
            >
                {loading?<ActivityIndicator size="large" color="#ffffff" />:<Text style={styles.buttonText}>{text}</Text>}
                {description && <Text  style={{color:"#f2f2f2"}} >{description}</Text>}
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    serviceContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        margin:10,
        padding:10,
        borderRadius:13,
    },
    buttonText:{
        color:"#ffffff",
        fontSize:18
    },
})