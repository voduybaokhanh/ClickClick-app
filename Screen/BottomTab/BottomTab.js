import React from 'react';
import { StyleSheet , Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';

import Notifications from '../user/Notifications';
import AddPost from './AddPost';
import Profile from './Profile';
import CustomHomeIcon from './../../Image/home_icon.png';
import CustomMessengerIcon from './../../Image/messenger_icon.png';
import CustomNotificationIcon from './../../Image/notification_icon.png';
import CustomAddPostIcon from './../../Image/addpost_icon.png';
import CustomProfileIcon from './../../Image/profile_icon.png';
import MessageListScreen from '../user/MessageListScreen';
import TestPost from './TestPost';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator  screenOptions={{
        tabBarStyle: {
          labelPosition: 'below-icon',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height:90,
          padding:20,
          backgroundColor: 'white', // Màu nền trong suốt
          borderTopWidth: 0, // Loại bỏ đường viền phía trên
          position: 'absolute', // Tạo vị trí tuyệt đối cho tabBar
          bottom: 0, // Đặt tabBar ở bottom
          left: 0, // Đặt tabBar ở left
          right: 0, // Đặt tabBar ở right
          elevation: 0, // Loại bỏ shadow trên Android
        },
        tabStyle: {
          justifyContent: 'center', // Căn giữa các tab
        },
        labelStyle: {
          fontSize: 14, // Kích thước của chữ trên các tab
          marginTop: -5,// Khoảng cách giữa chữ và biểu tượng
        },
         // Màu của tab được chọn
         // Màu của các tab không được chọn
        tabBarActiveTintColor:'#8B64DA',
        tabBarInactiveTintColor:"white"
            }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
            headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={CustomHomeIcon}  />
          ),
        }}
      />
      <Tab.Screen
        name="Messenger"
        component={MessageListScreen}
        options={{
            headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={ CustomMessengerIcon}  />
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={AddPost}
        options={{
            headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image style={styles.tron} source={CustomAddPostIcon}  />
          ),
        }}
      />
     <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
            headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={CustomNotificationIcon}  />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
            headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={CustomProfileIcon}  />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
    tron:{
        padding:20
    },
    tabbar: {
        height: 500,
        borderRadius: 30,
    },
});
