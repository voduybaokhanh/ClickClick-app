import {
    StyleSheet,
    View,
    Image,
    ActivityIndicator,
    Text,
    Alert,
    TouchableOpacity,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import React, { useEffect,useState } from "react";
  import { SpaceComponent } from "../../components";
  import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../helper/Axiostance";
  
const Setting = ({navigation}) => {
  

    const handledEditProfile = () =>{
      navigation.navigate('EditProfile')

    }
    const handledChange = () =>{
        navigation.navigate('registerOTP')
    }
    const handleDelete = () => {
      // Hiển thị cảnh báo xác nhận trước khi xóa tài khoản
      Alert.alert(
        "Xác nhận xóa tài khoản",
        "Bạn có chắc chắn muốn xóa tài khoản không?",
        [
          {
            text: "Hủy",
            style: "cancel",
            
          },
          {
            text: "Xác nhận",
            onPress: confirmDelete,
          },
        ]
      );
    };
  
    const confirmDelete = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("Token (userid) not found in AsyncStorage");
          return;
        }
  
        const instance = await AxiosInstance();
  
        const body = {
          userid: parseInt(token),
        };
        const response = await instance.post("/delete-account.php", body);
        console.log(response);
        navigation.navigate("Login");
      } catch (error) {
        console.error("Lỗi khi xóa tài khoản:", error);
      }
    };
    const handedLogout = () =>{
        navigation.navigate('Login');
    }
  return (
    <View style={styles.container}>
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
           <TouchableOpacity onPress={() => navigation.goBack()} style={{top:50,marginLeft:10}} >
          <Image style={styles.image}
              source={require("../../Image/arrow-left.png")}
             />
        </TouchableOpacity>
        <View style={styles.DIV}>
         <Text  style={styles.text1}>Setting</Text>
        </View> 
        <View style={{top:80}}>
            <TouchableOpacity onPress={handledEditProfile} style={{ width: "100%", height: 60, flexDirection: 'row', alignItems: 'center',backgroundColor:'#ffffff',borderRadius:20,marginBottom:20}}>
                <Image style={{marginRight:20,marginLeft:10}} source={require('../../Image/logoEdit.png')}/>
                <Text style={{color:'#635A8F',fontSize:20,fontWeight:'bold'}}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handledChange} style={{ width: "100%", height: 60, flexDirection: 'row', alignItems: 'center',backgroundColor:'#ffffff',borderRadius:20,marginBottom:20}}>
                <Image style={{marginRight:20,marginLeft:10}} source={require('../../Image/logoChange.png')}/>
                <Text style={{color:'#635A8F',fontSize:20,fontWeight:'bold'}}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={{ width: "100%", height: 60, flexDirection: 'row', alignItems: 'center',backgroundColor:'#ffffff',borderRadius:20,marginBottom:280}}>
                <Image style={{marginRight:20,marginLeft:10}} source={require('../../Image/logoDelete.png')}/>
                <Text style={{color:'#635A8F',fontSize:20,fontWeight:'bold'}}>Delete account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handedLogout} style={{ width: "100%", height: 60, flexDirection: 'column', alignItems: 'center',backgroundColor:'#635A8F',borderRadius:20,marginBottom:20}}>
                <Text style={{color:'#ffffff',fontSize:30,fontWeight:'bold',lineHeight:50}}>Log out</Text>
            </TouchableOpacity>
        </View>
       
    </LinearGradient>
  
  </View>
  )
}

export default Setting

const styles = StyleSheet.create({
    image:{
      
    },
    Sngg: {
      right: 10,
      marginBottom: 20,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    imgGG: {},
    DIV2:{
      
      position: "relative",
      top: 250,
      
    },
    DIV:{
        top:40,
        alignItems:'center'
    },
    text1: {
     fontSize:40,
     fontWeight: "bold",
     color:"#ffffff",
    marginBottom:30,
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
   
  });
  