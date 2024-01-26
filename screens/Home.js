import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUsers } from '../Firebase/firebase'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
    const [userData, setUserData] = useState([]);
    const [userId, setUserID] = useState(null);

    const navigation = useNavigation();
    const fetchData = async() =>
    {
        try {
            const email = await AsyncStorage.getItem('User');
            setUserID(email)
            const data = await getUsers(email);
            setUserData(data);
            console.log("Data",data);
            
        } catch (error) {
            console.error("Errror setting userdata state")
        }

    }
    useEffect(()=>
    {
        console.log("UserData",userData);
        // fetchData();
    },[userData])
    useEffect(()=>
    {
    fetchData()
    },[])
    // const signOut=()=>
    // {
    // //    fetchData();
    //     AsyncStorage.setItem("User","")
        
    // }
  return (
    <SafeAreaView>
        <Text>Chats</Text>
      <FlatList
      data={userData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
            <TouchableOpacity onPress={()=>{navigation.navigate("Chat", {id: userId,data: item.data})}} style={tw`bg-purple-300 m-1 p-5 items-center border-gray-100 border-2 rounded-xl w-100`}>
            <Text>{item.data.name}</Text>
            </TouchableOpacity>
        </View>
      )}
      />
        {/* <TouchableOpacity onPress={signOut()}>
            <Text>SignOut</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default Home