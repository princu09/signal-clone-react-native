import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {auth} from '../../../firebaseConfig';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [profile, setProfile] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Login',
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const register = async () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profile,
        });
      })
      .then(() => console.log('Profile Updated...'))
      .catch(error => console.log(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Text h3 style={{marginBottom: 50}}>
        Create a Signal Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          secureTextEntry
          placeholder="Password"
          type="text"
          value={pass}
          onChangeText={text => setPass(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={profile}
          onChangeText={text => setProfile(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
      <View className="h-[100px]" />
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginTop: 50,
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
