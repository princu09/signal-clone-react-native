import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();

const globalScreenOption = {
  headerStyle: {backgroundColor: '#3a76f0'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
  headerTitleAlign: 'center',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOption}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
