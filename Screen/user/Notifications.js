import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from '../../helper/Axiostance';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";

const Notifications = () => {
  const userID = useRef()
  const [notifications, setNotifications] = useState([]);
  const [listFriend, setListFriend] = useState([])
  const [listFriendStatus, setlistFriendStatus] = useState([])
  
  useEffect(() =>{
    const getId =  async() =>{
    const idUser = await AsyncStorage.getItem("token")
    console.log(idUser, "a");
     userID.current = idUser
    }
    getId()
    fetchNotifications();
  },[])
  console.log(notifications);
  useEffect(() => {
    // Gọi API để lấy danh sách thông báo khi component được tải lần đầu
   
  }, []); // Truyền mảng rỗng để chỉ gọi một lần sau khi component được tải
  const fetchNotifications = async () => {
    try {
      const instance = await AxiosInstance();

      // Gọi API để lấy danh sách thông báo
      //
      const responseNoti = await instance.post('/get-all-notifications.php', { userid: 4 });
      const responseFriend = await instance.post('/get-all-friendlist.php', { userid: 4 });
      const responseFriendStatus = await instance.post('/get-all-friendships.php', { userid: 4 });
      if(responseFriend?.status){
        setListFriend(responseFriend)
        setlistFriendStatus([...responseFriendStatus.invitations])
      }
      // Thay thế 'URL_API' và 'ID_NGUOI_DUNG' bằng URL và ID người dùng thực tế
      if (responseNoti?.status) {
        // Nếu lấy dữ liệu thành công
        setNotifications(responseNoti?.notifications); // Cập nhật state với danh sách thông báo từ API
      } else {
        console.error('Error fetching notifications:', responseNoti.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Function để render mỗi mục trong danh sách thông báo
  const renderItem = ({ item }) => {

    return(
      <View style={styles.notificationItem}>
        <View style={styles.avatar}></View>
        <View style={{flexDirection:'column'}}>
        <Text style={styles.textNoti} >{item.CONTENT}</Text>
       <Text style={styles.textNoti} >{item.TIME.substring(item.TIME.length -8, item.TIME.length -3)}</Text>
        </View>
    </View>
    )
  };
  const renderItemFriend = ({ item, index }) => {
    return(
      <View style={styles.notificationItem}>
      <Text>{listFriend.friendName[index] || item.NAME}</Text>
      {item.STATUS == 'pending' && 
      <Text>da gui loi moi ket ban</Text>
  }
      {item.STATUS == 'pending' && 
      <View style={{flexDirection: 'row',gap: 10}}>
        <Pressable style={{width: 100, height: 40, backgroundColor:'red'}}>
        <Text>Accept</Text>
        </Pressable>
        <Pressable style={{width: 100, height: 40, backgroundColor:'red'}}>
        <Text>Delete</Text>
        </Pressable>
        </View>}
    </View>
    )
  };
  return (
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={[styles.linearGradient,styles.container]}
      >
      <SafeAreaView style={{flex: 1}}>
     <Text style={styles.title}>Notifications</Text>
      {/* Sử dụng FlatList để hiển thị danh sách thông báo */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()} // Sử dụng trường ID làm key
      />
     </SafeAreaView>
     <View style={{flex: 1}}>
      <FlatList
      data={listFriendStatus.flat()}
      renderItem={renderItemFriend}
      keyExtractor={(item) => item.USERID.toString()}
      />
     </View>
     </LinearGradient>

  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection:'row',
    alignItems:'center',
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical:10
  },
  avatar:{
    borderRadius: 50, 
    backgroundColor:'white',
    width: 50, 
    height: 50, 
    borderWidth: 0.5, 
    borderColor: 'gray'
  },
  textNoti:{
    fontSize: 18,
    color: 'white'
  },
  linearGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
  },
});
