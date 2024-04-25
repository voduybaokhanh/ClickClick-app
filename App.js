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
import MessageListScreen from './Screen/user/MessageListScreen';
import MessProps from './Screen/MessProps';
import Notifications from './Screen/user/Notifications';
import Profile  from './Screen/BottomTab/Profile';
import Search_Addfriend from './Screen/user/Search_Addfriend';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Setting from './Screen/user/Setting';
import EditProfile from './Screen/user/EditProfile';
const Stack = createNativeStackNavigator();

export default function App(navigation) {
  return (
    <SafeAreaProvider styles={styles.container}>
      <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Hello" component={Hello} />
        <Stack.Screen name="Search_Addfriend" component={Search_Addfriend} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="forgot" component={Forgetpassword} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="registerOTP" component={RegisterOtp} /> 
        <Stack.Screen name="resetPass" component={Resetpassword} /> 
        <Stack.Screen name="messlistscreen" component={MessageListScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />  
        <Stack.Screen name="MessProps" component={MessProps} /> 
        <Stack.Screen name="Setting" component={Setting} /> 
        <Stack.Screen name="EditProfile" component={EditProfile} /> 

      </Stack.Navigator>   
    </NavigationContainer>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
