import React, { useCallback, useEffect, useState } from "react";
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
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axiostance from "../helper/Axiostance";

function Mess() {
  const [textInput, setTextInput] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    fetchChatData();
  }, []);

  const fetchChatData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await Axiostance();
      const body = { SENDERID: parseInt(token), RECEIVERID:33 };
      const response = await instance.post("/get-all-chat.php", body);
      if (response.status) {
        setChatData(response.chats);
        console.log(response.chats);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const renderItem = ({ item }) => {
    const RECEIVERID = 33;

    const token = AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
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
        {item.postid ? (
          <Image
            style={{ borderRadius: 10, width: 150, height: 150 }}
            source={{ uri: item.postid }}
          />
        ) : (
          <Text
            style={[
              {
                height: 50,
                backgroundColor: isReceiver ? "#635A8F" : "#3E8A85", // Thay đổi màu nền dựa trên người gửi/nhận
                textAlign: "center",
                fontSize: 20,
                padding: 10,
                color: "white",
              },
              isReceiver
                ? {
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                  }
                : {
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: 15,
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
        style={{ width: "100%", height: "100%"}}
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
          <Icon name="chevron-back" color={"#635A8F"} size={35}/>
          <Image
            style={{ height: 60, width: 60 }}
            source={require("../Image/avatar.png")}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "white",
              marginLeft: 20,
            }}
          >
            Edein Vindain
          </Text>
          <Feather
            style={{ position: "absolute", right: 10,bottom:20 }}
            name="more-vertical"
            color={"#635A8F"}
            size={35}
          />
        </View>
        <Text style={{ textAlign: "center", color: "#ffffff" }}>{chatData.TIME}</Text>
        <FlatList
          style={{paddingHorizontal: 10, marginBottom: 70,marginTop:-10 }}
          data={chatData}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID.toString()}
        />
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            position: "absolute",
            bottom: 0,
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
            value={textInput.toString()}
            onChangeText={(e) => setTextInput(e)}
          />
          <Pressable>
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
