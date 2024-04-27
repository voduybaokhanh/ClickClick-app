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
import { useNavigation } from "@react-navigation/native";

const Search_Addfriend = () => {
  const navigation = useNavigation();
  const handleReport = () => {
    // Xử lý khi icon được ấn
    console.log("Bao cao nguoi dung");
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../Image/arrow-left.png")}
            style={{ top: 40 }}
          />
        </TouchableOpacity>
        <View style={{ top: 45, alignItems: "center" }}>
          <Text style={styles.creat}>Add your friends</Text>
          <Text style={styles.text}>
            You can only add friends with 20 people
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <TextInput
            style={styles.mes}
            placeholder="Search your contacts"
            placeholderTextColor={"#A99EDD"}
            // Cập nhật nội dung bài viết khi người dùng nhập
          />
        </View>
        <View style={styles.searchResult}>
          <View
            style={{flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../Image/image 16.png")}
            />
            <Text style={styles.text2}>Result</Text>
          </View>
          <View style={styles.result}>
          <View style={styles.list}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
          <Image
              source={require("../../Image/avatar.png")}
            />
             <Text style={styles.name}>David</Text>
          </View>
          <View style={{flexDirection:"row",  alignItems:"center"}}>
            <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}>+ Add </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={handleReport}
                >
                  <Image
                    style={styles.iconmore}
                    source={require("../../Image/more_icon.png")}
                  />
                </TouchableOpacity>
            </View>
          </View>
          </View>

        </View>

        <View style={styles.listfriend}>
          <View
            style={{flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../Image/icons.png")}
            />
            <Text style={styles.text2}>List Friend</Text>
          </View>

          
          <View style={styles.list}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
          <Image
              source={require("../../Image/avatar.png")}
            />
             <Text style={styles.name}>David</Text>
          </View>
          <View style={{flexDirection:"row",  alignItems:"center"}}>
            <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}>- Unf </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={handleReport}
                >
                  <Image
                    style={styles.iconmore}
                    source={require("../../Image/more_icon.png")}
                  />
                </TouchableOpacity>
            </View>
          </View>

          </View>


      </LinearGradient>
    </View>
  );
};

export default Search_Addfriend;

const styles = StyleSheet.create({
  iconmore: {
    marginLeft: "auto",
  },
  btntext:{
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    
  },
  btn:{
  borderRadius:20,
  backgroundColor:"#574C8D",
  height:45, 
  padding:10,
  marginLeft: "auto",
  marginRight:10
  },
  name:{
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  list:{
flexDirection:"row",
top: 15,
alignItems:"center",
justifyContent:"space-between"
  },
  mes: {
    backgroundColor: "#E5D7F7",
    height: 41,
    borderRadius: 20,
    width: "90%",
    paddingHorizontal: 20,
    fontSize: 17,
    marginTop: 40,
    color: "#635A8F", // Updated to a numeric value
  },
  text2: {
    fontSize: 22,
    color: "#574C8D",
    fontWeight: "bold",
    marginLeft: 7,
  },
  text: {
    fontSize: 15,
    color: "#F6ECF1",
    marginTop: 10,
  },
  creat: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },
  searchResult:{
    width: '100%',
    height: 120,
    marginVertical: 10
  }
});
