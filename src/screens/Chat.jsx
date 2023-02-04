import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Avatar, Image, Input, Text} from 'react-native-elements';
import Phone from '../assets/phone.png';
import Video from '../assets/video_call.png';
import Send from '../assets/send-message.png';
import {
  serverTimestamp,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';

import {auth, db} from '../../firebaseConfig';

const Chat = ({navigation, route}) => {
  const [input, setInput] = useState('');

  const [chat, setChat] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(
      collection(db, `chats/${route.params.id}/messages`),
    );

    setChat(
      querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })),
    );
  };

  useLayoutEffect(() => {
    getData();
  }, [route]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    addDoc(collection(db, `chats/${route.params.id}/messages`), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName || 'Demo User',
      email: auth.currentUser.email || 'email@email.com',
      photoURL:
        auth.currentUser.photoURL ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    }).then(() => setInput(''));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: true,
      headerBackTitleVisible: true,
      headerBackTitle: 'Chats',
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 20,
            width: 80,
          }}>
          <TouchableOpacity>
            <Image source={Video} style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Phone} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => {
        return (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              rounded
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
              }}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                fontWeight: '700',
                fontSize: 18,
              }}>
              {route.params.chatName}
            </Text>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}>
          <>
            <ScrollView>
              {chat.map(({id, data}) => {
                return data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciver}>
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-10}
                      right={-5}
                      size={20}
                      source={{uri: data.photoURL}}
                    />
                    <Text style={styles.reciverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-10}
                      right={-5}
                      size={20}
                      source={{uri: data.photoURL}}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                style={styles.textInput}
                value={input}
                onChangeText={text => setInput(text)}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Image source={Send} style={{width: 20, height: 20}} />
              </TouchableOpacity>
            </View>
          </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  reciver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 12,
    marginRight: 15,
    maxWidth: '80%',
    position: 'relative',
    marginTop : 15
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 12,
    marginRight: 15,
    maxWidth: '80%',
    position: 'relative',
    marginTop : 15
  },
  senderText: {
    color: 'white',
  },
});
