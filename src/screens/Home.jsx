import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import CustomListItem from '../components/CustomListItem';
import {Avatar} from 'react-native-elements';
import {auth} from '../../firebaseConfig';
import {signOut} from 'firebase/auth';

const Home = ({navigation}) => {
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
          <TouchableOpacity activeOpacity={0.5}></TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}></TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
