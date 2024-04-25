  import { LinearGradient } from "expo-linear-gradient";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import AxiosInstance from "../../helper/Axiostance";

  import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from "react-native";
  import { useState, useEffect } from "react";

  const MessageListScreen = () => {
    const navigation = useNavigation();
    const [friendList, setFriendList] = useState([]);
    useEffect(() => {
      fetchFriendList();
    }, []);

    const fetchFriendList = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("Token (userid) not found in AsyncStorage");
          return;
        }

        const instance = await AxiosInstance();
        const body = { userid: parseInt(token) };
        const response = await instance.post("/get-all-friend.php", body);
        // Lưu trạng thái action vào state friendList
        setFriendList(response.friendName);        
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };

    return (
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../Image/arrow-left.png")} />
          </TouchableOpacity>
            <Text style={styles.textMessage}>Message</Text>
            <Image
              style={styles.iconSetting}
              source={require("../../Image/setting_icon.png")}
            />
          </View>
          <FlatList
            data={friendList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <Pressable
                onPress={() => navigation.navigate("MessProps", { avatar: item.avatar, name: item.name,friendshipid: item.friendshipid })}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  marginTop:10
                }}
              >
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 50 }}
                    source={{ uri: item.avatar }}
                  />
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                    }}
                  >
                    <Text style={styles.textName}>{item.name}</Text>
                    {item.lastMessage ? (
                      <Text style={{fontSize:17,color: "white",bottom:7}} >{item.lastMessage.CONTENT}</Text>
                    ) : (
                      <Text style={{fontSize:17,color: "white",bottom:7}}>No messages</Text>
                    )}
                  </View>
                  <Text style={{ alignSelf: "flex-end" }}>
                    {item.lastMessage ? item.lastMessageDate : ''}
                  </Text>
                  <Image source={require("../../Image/more.png")} />
                </Pressable>
              );
            }}
          />
        </SafeAreaView>
      </LinearGradient>
    );
  };

  export default MessageListScreen;

  const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
    textMessage: {
      flex: 1,
      marginLeft: 28,
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    iconSetting: {
      width: 28,
      height: 28,
    },
    textName: {
      flex: 1,
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      paddingTop: 20,
      bottom:10
    },
  });
