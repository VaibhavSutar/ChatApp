import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const SplashScreen = () => {
    const navigation = useNavigation();
    
    useEffect(()=>
    {
        setTimeout(()=>
        {
            loginState();

        },2000)
    },[])
    const loginState = async () =>
    {
        
        const user = await AsyncStorage.getItem("User");
        console.log(user)
        if(user)
        {
            navigation.navigate("Home")
        }
        else{
            navigation.navigate("Login")
        }
    }
  return (
    <View style={tw`bg-blue-600 flex-1 items-center justify-center`}>
      <Text style={tw`text-white text-3xl font-bold`}>Chat App</Text>
      <Text style={tw`text-white text-3xl font-bold`}>Using Firebase</Text>
    </View>
  )
}

export default SplashScreen