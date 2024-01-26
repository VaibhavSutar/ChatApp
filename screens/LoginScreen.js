import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { singInUser } from '../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
    const [email,setEmail] = useState(null);
    const [pass,setPass] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleOnClick =async() =>
    {
        console.log("email",email,"pass",pass)
        const user = await singInUser(email,pass)
        if(user)
        {
            const email = user.email;
            dispatch(setUser(user.email))
            AsyncStorage.setItem("User",email);
            navigation.navigate("Home")
            console.log(AsyncStorage.getItem("User"));
            console.log("User", user);
            
        }
    }
  return (
    <View style={tw`m-10 items-center`}>
      {/* {Title} */}
      <Text style={tw`rounded-xl items-center text-2xl font-bold`}>Login</Text>
      {/* {Email and Password feilds} */}   
      <TextInput placeholder='Email' style={tw`mt-5 border-2 border-gray-400 w-80 rounded-xl items-center`} textContentType='emailAddress' onChangeText={(val)=>{setEmail(val)}}/>
      <TextInput placeholder='Password' style={tw`mt-5 border-2 border-gray-400 w-80 rounded-xl items-center`} onChangeText={(val)=>{setPass(val)}}/>

    <TouchableOpacity style={tw`mt-10 bg-purple-400  w-70 h-10 rounded-xl items-center`} onPress={()=>{
     handleOnClick();
    }}><Text style={tw`mt-1 text-xl font-bold`}>Login</Text></TouchableOpacity>

    <TouchableOpacity style={tw`mt-5 w-70 h-10 items-center`} onPress={()=>{navigation.navigate('SignUP')}}><Text style={tw`mt-1 text-xl font-bold`}> Or SignUp</Text></TouchableOpacity>
    </View>
  )
}

export default LoginScreen