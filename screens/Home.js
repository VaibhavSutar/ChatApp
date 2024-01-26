import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getGroupChats, getUsers } from '../Firebase/firebase'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
const Home = () => {
    const [userData, setUserData] = useState([]);
    const [groupChats, setGroupChats] = useState([]);
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
    const fetchGroupChat = async() =>
    {
        try {
            const data = await getGroupChats();
            setGroupChats(data);
            console.log("Group CHat", data)
        } catch (error) {
            console.error("Errror setting groupChat state")
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
    fetchGroupChat()
    },[])
  return (
    <SafeAreaView style={tw`bg-blue-200 flex-1`}>
        <View style={tw`items-center`}>
        <Text style={tw`text-black text-2xl mb-10 mt-3 font-bold`}>Chats</Text>
        </View>
        <View>

      <FlatList
      data={userData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={()=>{navigation.navigate("Chat", {id: userId,data: item.data})}} style={tw`bg-blue-300 m-1 p-5 items-center border-gray-100 border-2 rounded-xl`}>
            <Text  style={tw`text-black text-xl `}>{item.data.name}</Text>
            </TouchableOpacity>
        </View>
      )}
      
      />
      <FlatList
      data={groupChats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={()=>{navigation.navigate("GroupChat", {groupID: item.id,userId: userId, userName: item.data.name,data: item.data})}} style={tw`bg-blue-300 m-1 p-5 items-center border-gray-100 border-2 rounded-xl`}>
            <Text  style={tw`text-black text-xl`} >{item.data.name}</Text>
            </TouchableOpacity>
        </View>
      )}
      
      />
      </View>
    </SafeAreaView>
  )
}

export default Home