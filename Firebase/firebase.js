import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const createUser = async (email, pass, username, mobile) => {
  if (email && pass) {
    try {
      const userCred = await auth().createUserWithEmailAndPassword(email, pass);
      const user = userCred.user;
      await firestore()
        .collection('users')
        .doc(email)
        .set({
          name: username,
          email: email,
          mobile: mobile,
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      return user;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error(error);
      }
      throw error;
    }
  }
};

export const singInUser = async (email, pass) => {
  if (email && pass) {
    try {
      const userCred = await auth().signInWithEmailAndPassword(email, pass);
      const user = userCred.user;
      console.log(user, 'SignIN');
      return user;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('User not found. Please check your email or register.');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Wrong password. Please check your password.');
      } else if (error.code === 'auth/invalid-email') {
        console.log('Invalid email. Please provide a valid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        console.log(
          'Too many unsuccessful login attempts. Please try again later.',
        );
      } else {
        console.error('Authentication error:', error);
      }
      throw error;
    }
  }
};
export const getUsers = async (email) => {
    if(email)
    {

        try {
            const fetchedData = [];
            const querySnapshot = await firestore()
            .collection('users')
            .where(firestore.FieldPath.documentId(), '!=', email)
            .get();
            
            const grpQuerySnapshot = await firestore()
            .collection('groupChats')
            .get();
            grpQuerySnapshot.forEach(doc => {
                // Here, you have a user document
                const userData = doc.data();
                fetchedData.push({
                    id: doc.id,
                    data: userData,
                });
            });
            console.log('User Data:', fetchedData);
            
            querySnapshot.forEach(doc => {
                // Here, you have a user document
                const userData = doc.data();
                fetchedData.push({
                    id: doc.id,
                    data: userData,
                });
            });
            
            return fetchedData;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
};
export const getGroupChats = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('groupChat')
        .get();
  
      const groupChats = [];
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        groupChats.push({
          id: doc.id,
          data: userData
        });
      });
  
      return groupChats;
    } catch (error) {
      console.error('Error fetching group chats:', error);
      throw error;
    }
  };
export const sendMsg = async (senderId, recieverId, myMsg) => {
    try { 
        await firestore()
          .collection('chats')
          .doc('' + senderId + '' + recieverId)
          .collection('messages')
          .add(myMsg);
        await firestore()
          .collection('chats')
          .doc('' + recieverId + '' + senderId)
          .collection('messages')
          .add(myMsg);
        
    } catch (error) {
        console.log("errro sending msg")
    }
};
export const sendGroupMsg = async (groupChatId, message) => {
    try {
      await firestore()
        .collection('groupChat')
        .doc(groupChatId)
        .collection('messages')
        .add({
          ...message,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Error sending group message:', error);
      throw error;
    }
  };
  
  export const getGroupChatMessages = async (groupChatId) => {
    try {
      const querySnapshot = await firestore()
        .collection('groupChat')
        .doc(groupChatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .get();
  
      const messages = [];
      querySnapshot.forEach(doc => {
        messages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        });
      });
  
      return messages;
    } catch (error) {
      console.error('Error fetching group chat messages:', error);
      throw error;
    }
  };