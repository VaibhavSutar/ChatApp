import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import SignUp from './screens/SignUp'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chat from './screens/Chat';
const Stack = createNativeStackNavigator();
const App = ({navigation}) => {
  const [user,setUser] = useState(null);
  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("User");
      console.log("Async User", user);
      if(user)
      {
        setUser(true);
      }
      // Dispatch user data to Redux or perform other actions based on user data
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [navigation]); 
  return (
    <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ?
        (
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        )
        :
        (
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
        )

        }
        <Stack.Screen name='SignUP'  component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='Chat'  component={Chat} options={{headerShown:true}}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App