import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useCallback, useState,useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { getGroupChatMessages, sendGroupMsg } from '../Firebase/firebase';
const GroupChat = () => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('');
    const route = useRoute();
    console.log("Route Id",route.params.groupID);
    console.log("Route Id",route.params.userId);
    console.log("Route Id",route.params.userName);


    
    useEffect(() => {
        const subsciber = firestore()
      .collection('groupChat')
      .doc(route.params.groupID)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const newMessages = querySnapshot.docs.map(item => ({
          _id: item.id,
          ...item.data(),
          createdAt: item.data().createdAt.toDate()
        }));
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
      });
    return () => subsciber();
    }, [route.params.groupID])
  
    const onSend = useCallback(async (messages = []) => {
        try
        {
            const msg = messages[0];
            const finalMsg = {
              ...msg,
              user: {
                _id: route.params.userId,
                name: route.params.userName,
                createdAt: Date.parse(msg.createdAt)
              },
            };
        
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, finalMsg),
            );
            sendGroupMsg(route.params.groupID, finalMsg);

        }
        catch(error)
        {
            console.log(error)
        }
    }, [route.params.userId,route.params.groupID])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.userId,
        }}
      />
    )
}
const styles = StyleSheet.create({
    textInput: {
      color: 'black', // Set the text color for the input
      backgroundColor: 'white', // Set the background color for the input
      paddingHorizontal: 10,
    },
  });
export default GroupChat