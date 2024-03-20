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
import AxiosInstance from './helper/Axiostance';
const Stack = createNativeStackNavigator();

export default function App(navigation) {
  return (
      <NavigationContainer styles={styles.container}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Hello" component={Hello} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="forgot" component={Forgetpassword} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="registerOTP" component={RegisterOtp} />
        <Stack.Screen name="resetPass" component={Resetpassword} />

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
