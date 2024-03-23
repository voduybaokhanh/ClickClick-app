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

  View: {
    fontFamily : 'bold',
    color : 'White'

  },

});
