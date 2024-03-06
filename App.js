import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screen/Register';
import Login from './Screen/user/Login';
import Hello from './Screen/Hello';
import Post from './Screen/Post';
import Forgetpassword from './Screen/Forgetpassword';
import Profile from './Screen/Profile';
import Profileuser from './Screen/Profileuser';
import MessProps from './Screen/MessProps';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
         {/* <Stack.Screen options={{headerShown: false}} name="Hello" component={Hello} />  */}
         {/* <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />  */}
         {/* <Stack.Screen options={{headerShown: false}} name="Forgetpassword" component={Forgetpassword} />  */}
         {/* <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />  */}
         {/* <Stack.Screen options={{headerShown: false}} name="Profileuser" component={Profileuser} />  */}
         <Stack.Screen options={{headerShown: false}} name="MessProps" component={MessProps} /> 
         
         
        {/* <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen name="Post" component={Post} /> */}
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
