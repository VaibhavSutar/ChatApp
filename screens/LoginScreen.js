import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
    const [loginState, setLoginState] = useState(false);

    const createUser =async () =>
    {
        
       await auth()
        .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
    }
  return (
    <View style={tw`bg-gray-100`}>
      {/* {Email and Password feilds} */}   
      {/* <Text>Email</Text>
      <TextInput/>
      <Text>Password</Text> */}
    <TouchableOpacity onPress={()=>{createUser()}}><Text>Log IN</Text></TouchableOpacity>
    </View>
  )
}

export default LoginScreen