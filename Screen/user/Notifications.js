import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import AxiosInstance from "./../../helper/Axiostance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { StatusBar } from "expo-status-bar";

const Notifications = () => {
  const [isThatim, setIsThatim] = useState(false);
  const handleBaocao = () => {
    // Xử lý khi icon được ấn
    console.log("Icon đã được ấn");
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };

  const handleThatim = () => {
    // Xử lý khi icon được ấn
    console.log("Icon đã được ấn");
    setIsThatim(!isThatim);
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <TouchableOpacity>
          <Image
            style={styles.iconsetting}
            source={require("../../Image/setting_icon.dpng")}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
export default Notifications;
const styles = StyleSheet.create({
  iconsetting: {},

  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
});
