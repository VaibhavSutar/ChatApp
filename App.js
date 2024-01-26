import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import SignUp from './screens/SignUp'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chat from './screens/Chat';
import GroupChat from './screens/GroupChat';
import SplashScreen from './screens/SplashScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Home' component={Home} options={{headerShown:false,}}/>
        <Stack.Screen name='SignUP'  component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='Chat'  component={Chat} options={{headerShown:true}}/>
        <Stack.Screen name='GroupChat'  component={GroupChat} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App