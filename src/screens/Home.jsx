import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import CustomListItem from '../components/CustomListItem';
import {Avatar, Image} from 'react-native-elements';
import {auth, db} from '../../firebaseConfig';
import {signOut} from 'firebase/auth';
import Camera from '../assets/camera.png';
import Pen from '../assets/pen.png';
import {collection, getDocs} from 'firebase/firestore';

const Home = ({navigation}) => {
  const [chat, setChat] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'chats'));
    setChat(
      querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })),
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const signOutUser = () => {
    signOut(auth).then(() => navigation.replace('Login'));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 10,
          }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image source={Camera} style={{width: 25, height: 20}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            activeOpacity={0.5}>
            <Image source={Pen} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chat.map(({id, data: {chatName}}) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
