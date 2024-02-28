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
import AxiosInstance from "./../../helper/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <TextInput style={styles.search}
        placeholder="Search..."/>
        <Image style={styles.iconsearch} 
        source={require('../../Image/Search_Icon.png')}/>
       </LinearGradient>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  iconsearch:{

  },
  search:{
      height: 53,
      paddingHorizontal: 50,
      marginBottom: 16,
      marginTop:63,
      backgroundColor:"#443A74",
      borderRadius:24,
      width:"85%",
      fontSize:16,
      
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
})