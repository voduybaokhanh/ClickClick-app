import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
  Text,
  Keyboard,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axiostance from "../helper/Axiostance";

function Mess({route}) {
  const [content, setcontent] = useState("");
  const [chatData, setChatData] = useState([]);
  const { avatar, name ,friendshipid} = route.params || {};




const messageRef = useRef();
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      messageRef.current?.scrollToEnd();
    });
 


    return () => {
      showSubscription.remove();
    };
  }, []);
  useEffect(() => {
    fetchChatData();
  }, []);
  const sendMessage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await Axiostance();
      const body = {
        SENDERID: parseInt(token),
        RECEIVERID: friendshipid, // Thay đổi RECEIVERID theo người dùng nhận tin nhắn
        content: content, // Nội dung tin nhắn
      };
      const response = await instance.post("/chats.php", body);
      if (response.status) {
        // Tin nhắn gửi thành công, có thể cập nhật giao diện hoặc thực hiện các hành động khác
        console.log("Message sent successfully");
        setcontent(""); // Xóa nội dung tin nhắn sau khi gửi
      }
      await fetchChatData().then(() => {
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  
  const fetchChatData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await Axiostance();
      const body = { SENDERID: parseInt(token), RECEIVERID: friendshipid };
      const response = await instance.post("/get-all-chat.php", body);
      if (response.status) {
        setChatData(response.chats);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
    }
  };
 
  const renderItem = ({ item }) => {
    const RECEIVERID = friendshipid;
  
    const token = AsyncStorage.getItem("token");
    if (!token) {
      console.log("Token (userid) not found in AsyncStorage");
      return null; // Trả về null nếu không tìm thấy token
    }
    
    // Kiểm tra xem item có phải là của RECEIVERID hay không
    const isReceiver = item.SENDERID === RECEIVERID;
  
    // Kiểm tra xem SENDERID có giống với token hay không
    const isCurrentUser = item.SENDERID === parseInt(token);
  
    return (
      <View
        style={{
          flexDirection: isReceiver ? "row" : "row-reverse",
          marginTop: 10,
        }}
      >
        {/* Kiểm tra nếu item có postid (hình ảnh) */}
        {item.postid && (
          <Image
            style={{ borderRadius: 20, width: 200, height: 150, marginRight: isReceiver ? 0 : 10, marginLeft: isReceiver ? 10 : 0 }}
            source={{ uri: item.postid }}
          />
        )}
        {/* Kiểm tra nếu item có nội dung văn bản */}
        {item.CONTENT && (
          <Text
            style={[
              {
                height: 50,
                backgroundColor: isReceiver ? "#635A8F" : "#3E8A85", // Thay đổi màu nền dựa trên người gửi/nhận
                textAlign: "center",
                fontSize: 20,
                padding: 15,
                color: "white",
                borderRadius: 15,
                marginRight: isReceiver ? 0 : 10,
                marginLeft: isReceiver ? 10 : 0,
              },
            ]}
          >
            {item.CONTENT}
          </Text>
        )}
      </View>
    );
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        source={require("../Image/background.png")}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 100,
            backgroundColor: "#CBB6EE",
            paddingTop: 30,
          }}
        >
          <Icon name="chevron-back" color={"#635A8F"} size={35} />
          <Image
            style={{ height: 60, width: 60,borderRadius:30 }}
            source={{uri:avatar}}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "white",
              marginLeft: 20,
            }}
          >
            {name}
          </Text>
          <Feather
            style={{ position: "absolute", right: 10, bottom: 20 }}
            name="more-vertical"
            color={"#635A8F"}
            size={35}
          />
        </View>
        <Text style={{ textAlign: "center", color: "#ffffff" }}>
          {chatData.TIME}
        </Text>
        <FlatList
        ref={messageRef}
          style={{ paddingHorizontal: 10,  marginTop: -10 }}
          data={chatData}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID.toString()}
        />
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            // position: "absolute",
            // bottom: 0,
            height: 100,
            width: "100%",
            backgroundColor: "#CBB6EE",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
          }}
        >
          <TextInput
            style={{
              width: "60%",
              height: "40%",
              paddingHorizontal: 10,
              borderRadius: 20,
              backgroundColor: "#635A8F",
              padding: 0,
              color: "white",
              fontSize: 17,
            }}
            value={content.toString()}
            onChangeText={(e) => setcontent(e)}
          />
          <Pressable onPress={sendMessage}>
            <Image
              style={{ height: 50, width: 100 }}
              source={require("../Image/send.png")}
            />
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Mess;
