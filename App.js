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
import Forgetpassword from './Screen/user/ForgotpasswordOTP';
import RegisterOtp from './Screen/user/RegisterOtp';
import Resetpassword from './Screen/user/Resetpassword';
import ForgotPassword from './Screen/user/ForgotPassword';
import Notifications from './Screen/user/Notifications';
const Stack = createNativeStackNavigator();

export default function App(navigation) {
  return (
      <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
      {/* <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="BottomTab" component={BottomTab} />
        <Stack.Screen options={{headerShown: false}} name="Hello" component={Hello} />     
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Post" component={Post} /> */}
       {/* <Stack.Screen options={{headerShown: false}} name="forgot" component={Forgetpassword} /> */}
        {/* <Stack.Screen options={{headerShown: false}} name="register" component={Register} /> */}
        {/* <Stack.Screen options={{headerShown: false}} name="registerOTP" component={RegisterOtp} /> */}
        <Stack.Screen options={{headerShown: false}} name=' forgotpassword' component={ForgotPassword} />
        {/* <Stack.Screen options={{headerShown: false}} name='notifications' component={Notifications} /> */}
        {/* <Stack.Screen options={{headerShown: false}} name="resetPass" component={Resetpassword} /> */}

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
