import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screen/user/Register';
import Login from './Screen/user/Login';
import Hello from './Screen/Hello';
import Post from './Screen/BottomTab/AddPost';
import Home from './Screen/BottomTab/Home';
import BottomTab from './Screen/BottomTab/BottomTab';
import ForgotPassword from './Screen/user/ForgotPassword';
const Stack = createNativeStackNavigator();

export default function App(props) {
  return (
      <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword} />
        {/* <Stack.Screen options={{headerShown: false}} name="BottomTab" component={BottomTab} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Hello" component={Hello} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Post" component={Post} /> */}
      </Stack.Navigator>   
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
