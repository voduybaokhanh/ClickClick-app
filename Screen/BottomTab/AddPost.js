import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AxiosInstance from "../../helper/Axiostance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const AddPost = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState(""); // State để lưu nội dung bài viết
  const [image, setImage] = useState(""); // State để lưu đường dẫn hình ảnh

  // Hàm gửi bài viết đến API
  const sendPost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = {
        userid: parseInt(token),
        content: content,
        image: image,
      };
      
      const response = await instance.post("/add-posts.php", body); // Thay đổi đường dẫn API tương ứng
      // Kiểm tra phản hồi từ API và thực hiện các hành động cần thiết sau khi thêm bài viết thành công

      // Sau khi thêm bài viết thành công, quay trở lại trang trước đó
      navigation.goBack();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <ScrollView>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Image  source={require("../../Image/arrow-left.png")}/>
          </TouchableOpacity >
          <TouchableOpacity >
            <Image style={styles.iconsetting} source={require('../../Image/setting_icon.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:60, marginLeft:10}}>
          <Text style={styles.creat}>Create new post</Text>
          <Text style={styles.text}>Share the moment with your friends</Text>
        </View>
        <View style={styles.itempost}>
          <View style={styles.namepost}>
            <Image style={styles.avt} source={require('../../Image/avatar1.png')}/>
            <View style={{flexDirection:"column" , marginLeft:10}}>
              <Text style={styles.name}>You</Text>
            </View>
          </View>
          <View style={{width:'90%'}}>
            <Image style={{width:'auto'}} source={require('../../Image/camera.png')}/>
          </View>
        </View>
        <View style={{alignItems:'center',bottom:60}}>
          <TouchableOpacity>
            <Image source={require('../../Image/camera_icon.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:10,alignItems:'center'}}>
          <TextInput 
            style={styles.mes} 
            placeholder="Add a message" 
            placeholderTextColor={"#635A8F"}
            value={content}
            onChangeText={setContent} // Cập nhật nội dung bài viết khi người dùng nhập
          />
        </View>
        <TouchableOpacity style={{alignItems:'center', bottom:100}} onPress={sendPost}>
          <Text style={{color:'white', fontSize:16}}>Post</Text>
        </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

export default AddPost

const styles = StyleSheet.create({
  mes:{
    backgroundColor:"#E5D7F7",
    marginLeft:10,
    height:50,
    borderRadius:24,
    width:'80%',
    paddingHorizontal:20,
    bottom:220,
    fontSize:17, // Updated to a numeric value
  },
  
  namepost:{
    flexDirection:"row",
    alignItems:"center",
    top:12,
    width:'90%',
    marginBottom:20
  },
  iconmore:{
    marginLeft:'auto'
  },
  avt:{
   
  },
  name:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
  },
  itempost:{
    width:'auto',
    height:500,
    backgroundColor: "#BFA7FF",
    top:60,
    borderRadius:20,
    alignItems:"center",
  },
  text:{
    fontSize:15,
    color:'white'
  },
  creat:{
    fontSize:30,
    fontWeight:'bold',
    color:'white'
  },
  head:{
    paddingHorizontal:10,
    top:60,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
})
