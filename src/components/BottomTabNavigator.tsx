import { Image,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DefaultScreen from '../screens/homeScreens/DefaultScreen'
import CreateScreen from '../screens/homeScreens/CreateScreen';
import ProfileScreen from '../screens/homeScreens/ProfileScreen';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const iconMap: Record<string, any> = {
  Home: require('../assets/home.png'),
  HomeColored: require('../assets/homeColored.png'),
  Create: require('../assets/create.png'),
  CreateColored: require('../assets/createColored.png'),
  User: require('../assets/user.png'),
  UserColored: require('../assets/userColored.png'),
};

const CustomTabBarIcon: React.FC<{ label: string; isFocused: boolean }> = ({ label, isFocused }) => {
  const iconName = isFocused ? `${label}Colored` : label;
  const iconSource = iconMap[iconName];

  return <Image source={iconSource} style={isFocused? styles.tabIconFocused : styles.tabIcon} />;
};

const BottomTabNavigator: React.FC = () => {

    const {userType} = useContext(AuthContext);

    return (
    <Tab.Navigator screenOptions={{ tabBarStyle:styles.tabBar }} >
        <Tab.Screen 
            name='Default' 
            component={DefaultScreen} 
            options={{
                headerShown: false, 
                title:"Home",
                tabBarIcon:({focused})=>(
                    <CustomTabBarIcon label="Home" isFocused={focused} />
                ),
            }} 
                
        />
        {userType === "Consumer"?
        <Tab.Screen 
            name='Create' 
            component={CreateScreen} 
            options={{
                headerShown: false, 
                title:"Create",
                tabBarIcon:({focused})=>(
                    <CustomTabBarIcon label="Create" isFocused={focused} />
                ),
            }}  
        />
        :
        null
        }
        <Tab.Screen 
            name='Profile'
            component={ProfileScreen} 
            options={{
                headerShown: false, 
                title:"Profile",
                tabBarIcon:({focused})=>(
                    <CustomTabBarIcon label="User" isFocused={focused} />
                ),
            }} 
            />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar:{
        height:70,
        paddingBottom:10,
    },
    tabIcon: {
    width: 26,
    height: 26,
  },
  tabIconFocused:{
    width: 35,
    height: 35,
  }
})