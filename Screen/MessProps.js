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
  TouchableOpacity
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axiostance from "../helper/Axiostance";
import { useNavigation } from "@react-navigation/native";

function Mess({route}) {
  const navigation = useNavigation();
  const [content, setcontent] = useState("");
  const [chatData, setChatData] = useState([]);
  const { avatar, name, friendshipid } = route.params || {};

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
    const interval = setInterval(fetchChatData, 5000); // Fetch chat data every 5 seconds
    return () => clearInterval(interval);
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
        RECEIVERID: friendshipid,
        content: content,
      };
      const response = await instance.post("/chats.php", body);
      if (response.status) {
        console.log("Message sent successfully");
        setcontent("");
        // Fetch chat data after sending message
        fetchChatData();
      }
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
    }
  };

  const renderItem = ({ item }) => {
    const isReceiver = item.SENDERID === friendshipid;
  
    return (
      <View style={{ alignItems: isReceiver ? 'flex-start' : 'flex-end', marginVertical: 5 }}>
        {item.POSTID && (
          <Image
            style={{ borderRadius: 20, width: 200, height: 150, marginBottom: 5 }}
            source={{ uri: item.POSTID }}
          />
        )}
        {item.CONTENT && (
          <View
            style={[
              {
                backgroundColor: isReceiver ? "#635A8F" : "#C79BE7",
                borderRadius: 15,
                marginHorizontal: 10,
                marginVertical: 5,
                paddingHorizontal: 15,
                paddingVertical: 10,
                maxWidth: '70%',
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 18 }}>{item.CONTENT}</Text>
          </View>
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{marginLeft:10}} source={require("../Image/Vector.png")} />
          </TouchableOpacity>
          <Image
            style={{ height: 55, width: 55,borderRadius:30, marginLeft:10 }}
            source={{uri:avatar}}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "white",
              marginLeft: 10,
              fontWeight:"bold",
              top:5
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
            height: 90,
            width: "100%",
            backgroundColor: "#CBB6EE",
            justifyContent: "center",
            alignItems: "center",
            borderEndEndRadius: 30,
            
          }}
        >
          <TextInput
            style={{
              width: "75%",
              height: "50%",
              paddingHorizontal: 10,
              borderRadius: 30,
              backgroundColor: "#635A8F",
              padding: 0,
              color: "white",
              fontSize: 17,
              paddingHorizontal:20
            }}
            placeholder="Tin nhắn"
            placeholderTextColor={'#CBB6EE'}
            value={content.toString()}
            onChangeText={(e) => setcontent(e)}
          />
          <Pressable onPress={sendMessage}>
            <Image
            
              style={{ height: 45, width: 45 }}
              source={require("../Image/sent.png")}
            />
            
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Mess;
