import {StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Button, Image, Input} from 'react-native-elements';
import ChatIcon from '../assets/chat.png';
import {db} from '../../firebaseConfig';
import {collection, addDoc} from 'firebase/firestore';

const AddChat = ({navigation}) => {
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a New Chat',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerBackTitle: 'Chats',
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      await addDoc(collection(db, 'chats'), {
        chatName: input,
      })
        .then(() => navigation.goBack())
        .catch(error => alert(error));
    } catch (e) {
      alert('Error adding document: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a Chat Name"
        value={input}
        onChangeText={text => setInput(text)}
        leftIcon={<Image source={ChatIcon} style={{height: 23, width: 23}} />}
        style={{paddingLeft: 10}}
        autoCapitalize="none"
        onSubmitEditing={createChat}
      />
      <Button
        title="Create New Chat"
        onPress={createChat}
        style={{marginHorizontal: 50}}
      />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
