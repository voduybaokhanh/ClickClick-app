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

const Notifications = () => {
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
          <Text style={styles.textMessage}>Notifications</Text>
          <Image
            style={styles.iconSetting}
            source={require("../../Image/setting_icon.png")}
          />
        </View>
        <View style={styles.textNew}>
          <Text style={styles.tn}> New </Text>

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
                  paddingHorizontal: 20,
                }}
              ></Pressable>
           );
          }}
        />

      </SafeAreaView>
    </LinearGradient>
  );
};

export default Notifications;

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

  textNew: {
    marginLeft : 35,
    paddingTop: 30,

  },

tn : {
  
  fontStyle : "bold",
  color: "white",
  fontSize : 12,
  
  

}

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
],
    },
  ];
