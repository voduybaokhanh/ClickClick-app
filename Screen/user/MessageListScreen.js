import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AxiosInstance from "../../helper/Axiostance";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { StatusBar } from "expo-status-bar";

const MessageListScreen = () => {
  return (
    <View>
      <Text>MessageListScreen</Text>
    </View>
  )
}

export default MessageListScreen

const styles = StyleSheet.create({})