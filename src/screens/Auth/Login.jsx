import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, Button, Input} from 'react-native-elements';
import {auth} from '../../../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Login',
      headerBackTitleVisible: false,
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

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, pass).catch(error =>
      console.log(error),
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/4423/4423638.png',
        }}
        className="w-[100px] h-[100px]"
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="Password"
          value={pass}
          onChangeText={text => setPass(text)}
        />
      </View>
      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button
        containerStyle={styles.button}
        title="Register"
        type="outline"
        onPress={() => navigation.navigate('Register')}
      />
      <View className="h-[100px]" />
    </KeyboardAvoidingView>
  );
};

export default Login;

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
