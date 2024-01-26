import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native'
import { recieveMsg, sendMsg } from '../Firebase/firebase'
import firestore from '@react-native-firebase/firestore';
const Chat = () => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('');
    const route = useRoute();
    console.log(route.params.id);
    
    useEffect(() => {
        const subsciber =  firestore()
    .collection('chats')
    .doc(route.params.id + route.params.data.email)
    .collection('messages')
    .orderBy('createdAt','desc');
    subsciber.onSnapshot(querySnapshot=>
        {
            const allMessages = querySnapshot.docs.map(item=>
                {
                    return{...item._data, createdAt: item._data.createdAt}
                })
                setMessages(allMessages);
        })
    return () => subsciber();
    }, [])
  
    const onSend = useCallback(async(messages = []) => {
        const msg = messages[0]; 
        const finalMsg = {
            ...msg,
            sender:route.params.id,
            reciever:route.params.data.email,
            createdAt: Date.parse(msg.createdAt)
        }
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, finalMsg),
      )
      sendMsg(route.params.id,route.params.data.email,finalMsg);
      console.log(finalMsg);
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        inverted={true}
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
export default Chat