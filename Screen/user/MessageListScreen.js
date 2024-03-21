import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MessageListScreen = () => {
  const navigation = useNavigation();
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
          <Text style={styles.textMessage}>Message</Text>
          <Image
            style={styles.iconSetting}
            source={require("../../Image/setting_icon.png")}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("Mess", { data: item })}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Image
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                  source={item.image}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: 20,
                  }}
                >
                  <Text style={styles.textName}>{item.name}</Text>
                  {item.message[item.message.length - 1].type === "image" ? (
                    <Text style={{}}>Send image</Text>
                  ) : (
                    <Text>{item.message[item.message.length - 1].text}</Text>
                  )}
                </View>
                <Text style={{ alignSelf: "flex-end" }}>
                  {item.message[item.message.length - 1].date}
                </Text>
                <Image
                  source={require("../../Image/arrow-point-to-right.png")}
                />
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
    fontSize: 22,
    fontWeight: "500",
    paddingTop: 20,
  },
});

const data = [
  {
    id: 1,
    name: "John",
    image: require("../../Image/image1.png"),
    message: [
      {
        id: 1,
        type: "text",
        role: "acceptor",
        text: "What are you doing ?",
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "image",
        role: "sender",
        text: "Hello, have a great day!",
        image: require("../../Image/image2.png"),
        date: "11:00 PM",
      },
      {
        id: 5,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 6,
        type: "image",
        role: "sender",
        text: "Hello, have a great day!",
        image: require("../../Image/image2.png"),
        date: "11:00 PM",
      },
      {
        id: 7,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 8,
        type: "image",
        role: "sender",
        text: "Hello, have a great day!",
        image: require("../../Image/image2.png"),
        date: "11:00 PM",
      },
    ],
  },
  {
    id: 2,
    name: "Jane",
    image: require("../../Image/image2.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "image",
        role: "sender",
        image: require("../../Image/image1.png"),
        date: "7:00 AM",
      },
      {
        id: 5,
        type: "text",
        role: "sender",
        text: "Hello, have a great day!",
        date: "7:00 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Eva",
    image: require("../../Image/image1.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "text",
        role: "sender",
        text: "What are you doing ?",
        image: require("../../Image/image2.png"),
        date: "2:00 PM",
      },
    ],
  },
  {
    id: 4,
    name: "Trump",
    image: require("../../Image/image2.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "text",
        role: "sender",
        text: "Do you have money ?",
        image: require("../../Image/image2.png"),
        date: "6:00 PM",
      },
    ],
  },
  {
    id: 5,
    name: "Cross",
    image: require("../../Image/image1.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "image",
        role: "sender",
        text: "Hello, have a great day!",
        image: require("../../Image/image2.png"),
        date: "12:00 PM",
      },
    ],
  },
  {
    id: 6,
    name: "Alice",
    image: require("../../Image/image2.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "image",
        role: "sender",
        text: "Hello, have a great day!",
        image: require("../../Image/image2.png"),
        date: "1:00 AM",
      },
    ],
  },
  {
    id: 7,
    name: "William",
    image: require("../../Image/image1.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "text",
        role: "sender",
        text: "I don't know",
        date: "7:56 PM",
      },
    ],
  },
  {
    id: 8,
    name: "Alex",
    image: require("../../Image/image2.png"),
    message: [
      {
        id: 1,
        type: "image",
        role: "acceptor",
        image: require("../../Image/image1.png"),
      },
      {
        id: 2,
        type: "text",
        role: "acceptor",
        text: "Hello, have a great day!",
      },
      {
        id: 3,
        type: "text",
        role: "sender",
        text: "Thank you broo!",
      },
      {
        id: 4,
        type: "text",
        role: "sender",
        text: "What your name sir ?",
        date: "7:01 PM",
      },
    ],
  },
];
