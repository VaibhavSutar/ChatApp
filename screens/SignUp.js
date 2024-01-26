import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { createUser } from '../Firebase/firebase';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [loginState, setLoginState] = useState(false);
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [mobile,setMobile] = useState(null);
    const [pass,setPass] = useState(null);
    const navigation = useNavigation();
    const handleOnClick=()=>
    {
      console.log("email",email,"pass",pass)
      const userCred  = createUser(email,pass,name,mobile);
      if(userCred)
      {
        navigation.navigate("Login");
      }
    }
  return (
    <View style={tw`bg-blue-200 flex-1 justify-center`}>
      <View style={tw`items-center`} >

      {/* {Title} */}
      <Text style={tw`rounded-xl text-black items-center text-2xl font-bold`}>SignUp</Text>
      {/* {Email and Password feilds} */}   
      <TextInput placeholder='Username' style={tw`mt-5  text-black border-2 border-gray-400 w-80 rounded-xl items-center`} onChangeText={(val)=>{setName(val)}}/>
      <TextInput placeholder='Email' style={tw`mt-5 border-2  text-black border-gray-400 w-80 rounded-xl items-center`} textContentType='emailAddress' onChangeText={(val)=>{setEmail(val)}}/>
      <TextInput placeholder='Enter Mobile' style={tw`mt-5 border-2 text-black border-gray-400 w-80 rounded-xl items-center`} onChangeText={(val)=>{setMobile(val)}}/>
      <TextInput secureTextEntry={true} placeholder='Password' style={tw`mt-5 border-2 text-black border-gray-400 w-80 rounded-xl items-center`} onChangeText={(val)=>{setPass(val)}}/>

    <TouchableOpacity style={tw`mt-10 bg-blue-600  w-70 h-10 rounded-xl items-center`} onPress={()=>{
      handleOnClick();
    }}><Text style={tw`mt-1 text-xl text-white font-bold`}>Sign Up</Text></TouchableOpacity>

    <TouchableOpacity style={tw`mt-5 w-70 h-10 items-center text-black`} onPress={()=>{navigation.navigate('Login')}}><Text style={tw`mt-1 text-xl font-bold`}> Or Login</Text></TouchableOpacity>
    </View>
    </View>
  )
}

export default SignUp