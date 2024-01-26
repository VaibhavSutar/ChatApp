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
  try {
    const fetchedData = [];
    const querySnapshot = await firestore()
      .collection('users')
      .where(firestore.FieldPath.documentId(), '!=', email)
      .get();

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
export const recieveMsg = async (senderId, recieverId) => {
  const msg = await firestore()
    .collection('chats')
    .doc(senderId, recieverId)
    .collection('messages')
    .orderBy('createdAt','desc');
    msg.onSnapshot(querySnapshot=>
        {
            const allMessages = querySnapshot.docs.map(item=>
                {
                    return{...item._data, createdAt: Date.parse(new Date())}
                })
        })
    return () => msg();
};
