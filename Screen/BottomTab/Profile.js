import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import AxiosInstance from "../../helper/Axiostance";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();
 
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const body = { userid: parseInt(token)};
      const instance = await AxiosInstance();
      const result = await instance.post("/get-userid.php", body);
      console.log('>>>>>>>>: ' + result.data)
      if (result.status) {
        const userData = result.data; // Truy cập dữ liệu từ result.data
        await AsyncStorage.setItem("token", userData.id.toString());
      
        // Token đã được lưu trữ thành công, thực hiện các thao tác tiếp theo nếu cần
      }
      console.log('id: ' + userData.id);
      console.log('token: '+token);
    } catch (error) {
      console.error("Lỗi khi thực hiện : ", error);
    }
  }
  useEffect(() => {
    fetchProfile(); // Chạy hàm fetchProfile khi component được render
  }, []);
  
  return (
    <LinearGradient
      locations={[0.05, 0.4, 0.8, 1]}
      colors={["#FFFFFF", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../Image/arrow-left.png")} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
            (
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{ uri:user.avatar}}
                  style={styles.image1}
                />
              </View>

              <View style={styles.infoContainer}>
                <Text
                  style={[
                    styles.name,
                    { fontWeight: "500", fontSize: 35 },
                  ]}
                >
                  {user.name}
                </Text>
                <Text
                  style={[
                    styles.text10,
                    { color: "#4F39B4", fontSize: 20 },
                  ]}
                >
                  {user.id}
                </Text>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                  {/* <Text style={styles.text}>{userData.posts_count}</Text> */}
                  <Text style={[styles.text, styles.subText]}>Posts</Text>
                </View>

                <View
                  style={[
                    styles.statsBox,
                    {
                      borderColor: "#FFFFFF",
                      borderLeftWidth: 1,
                    },
                  ]}
                >
                  {/* <Text style={styles.text}>{userData.friend_count}</Text> */}
                  <Text style={[styles.text, styles.subText]}>Friend</Text>
                </View>
              </View>

              <Text style={styles.status}>{user.text}</Text>

              {/* Hiển thị các hình ảnh */}
              {/* <View style={styles.pic}>
                {userData.images.map((image, index) => (
                  <View key={index} style={styles.mediaImageContainer}>
                    <Image
                      source={{ uri: image }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View> */}
            </View>
          )
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  name:{
      fontFamily: "HelveticaNeue",
      color: "#ffffff",
      fontWeight:"bold",
      
  },
  image1:{
   height:100,
   width:100,
    borderRadius: 75,
    //overflow: "hidden",
    paddingTop: 2,
  },
  iconback: {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 10,
    marginHorizontal : 16,
    color : '#FFFFFF'
    
   
     
   },

  pic:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    marginBottom:1,
    marginTop:5
  },

  row:{
    flexDirection: 'row',
  },

  status: {
    color: "#FFFFFF",
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 5,
  },

  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  subText: {
    fontSize: 12,
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontWeight: "500",
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100 %",
  },
  text10: {
    fontFamily: "HelveticaNeue",
    color: "#ffffff",
    fontSize:22,
    fontSize:"300"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#ffffff",
    fontWeight:"bold",
    fontSize:22
  },

  image: {
    flex:1,
    height:undefined,
    width:undefined

  },

  profileImage: {
    alignItems:'center'
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 4,
  },

  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 1,
    padding: 1,
  },
});
