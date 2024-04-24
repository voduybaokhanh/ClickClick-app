import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../helper/Axiostance";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const EditProfile = ({navigation}) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState(null);
  
  const selectImage = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log("Kết quả chọn ảnh:", pickerResult.assets[0].uri);
  
      if (!pickerResult.canceled) {
        // Nếu người dùng chọn ảnh thành công, set imageUri
        setImageUri(pickerResult.assets[0].uri);
      }
    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);
    }
  };

  const resetImageUri = () => {
    setTimeout(() => {
      setImageUri(null);
    }, 1000); // Adjust the delay as needed
  };

  // Hàm tải ảnh lên máy chủ
  const uploadImage = async () => {
    try {
      const imageName = `photo_${Date.now()}.jpg`;
      const data = new FormData();
      data.append("file", {
        name: imageName,
        type: "image/jpeg",
        uri: imageUri,
      });
      data.append("upload_preset", "ml_default");
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dffuzgy5h/image/upload',
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );        
  
      // Trích xuất thông tin URL từ kết quả trả về của Cloudinary
      const publicId = response.data.public_id;
      const version = response.data.version;
      const format = response.data.format;
      const cloudName = "dffuzgy5h"; // Cloud name của bạn
      const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
      const imageUrl = `${baseUrl}/v${version}/${publicId}.${format}`;
      console.log(imageUrl);
      return imageUrl; // Trả về URL đầy đủ của hình ảnh đã tải lên
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên máy chủ:", error);
      throw error;
    }
  };

  // Hàm lưu thông tin hồ sơ đã chỉnh sửa
  const handleSaveProfile = async () => {
    try {

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
  
      const imageUrl = await uploadImage();
      const instance = await AxiosInstance();

      const body = {
        userid: parseInt(token),
        name: name,
        avatar: imageUrl,
        text: text
      };
      const response = await instance.post("/edit-profile.php", body);
      console.log(imageUrl);
      Alert.alert("Thông Báo", "Cập nhật hồ sơ thành công")
      setName("");
      setText("");
      resetImageUri(); // Reset imageUri after saving profile
      navigation.navigate('Home');

    } catch (error) {
      console.error("Lỗi khi lưu hồ sơ:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <View style={styles.div}>
          <Text style={styles.text1}>Edit Profile</Text>
        </View>
        <View style={styles.div}>
          <TouchableOpacity onPress={selectImage}>
            {imageUri ? (
              <Image
                style={styles.avatar}
                source={{ uri: imageUri }}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('../../Image/iconadd.png')}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="introduce yourself"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSaveProfile}
          >
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    paddingStart: 20,
    width: "80%",
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    marginBottom: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  div: {
    top: 80,
    alignItems: "center",
  },
  text1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    height: 60,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#635A8F",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 50,
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
