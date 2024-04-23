import React, { useState, useEffect, useRef } from "react";
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
import AxiosInstance from "../../helper/Axiostance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const avatarImages = [
    "../../Image/avata1.jpg",
    "../../Image/avata2.jpg",
    "../../Image/avata3.jpg",
    "../../Image/avata4.jpg",
    "../../Image/avata5.jpg",
    "../../Image/avata6.jpg",
    "../../Image/avata7.jpg",
    "../../Image/avata8.jpg",
    "../../Image/avata9.jpg",
    "../../Image/avata10.jpg",
    "../../Image/avata11.jpg",
    "../../Image/avata12.jpg",
    "../../Image/avata13.jpg",
    "../../Image/avata14.jpg",
    "../../Image/avata15.jpg",
    "../../Image/avata16.jpg",
    "../../Image/avata17.jpg",
    "../../Image/avata18.jpg",
    "../../Image/avata19.jpg",
    "../../Image/avata20.jpg",
    "../../Image/avata21.jpg",
    "../../Image/avata22.jpg",
    // Thêm các đường dẫn hình ảnh khác vào đây
  ];
  const getImageUri = (path) => {
    return `file:///${path}`;
  };
  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      // Chỉ thực hiện upload ảnh nếu capturedImageUri đã được gán giá trị

      // Upload ảnh lên Cloudinary và lấy đường dẫn ảnh từ phản hồi của Cloudinary
      const uploadedImageUrl = await uploadImage();

      const instance = await AxiosInstance();
      const body = {
        id: parseInt(token),
        name: name,
        text: text,
        avatar: uploadedImageUrl, // Sử dụng đường dẫn ảnh đã được upload lên Cloudinary
      };

      const response = await instance.post("/add-posts.php", body);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Hàm upload ảnh
  const uploadImage = async () => {
    try {
      // Check if imageUri has a value
      if (!imageUri) {
        throw new Error("No image to upload");
      }

      // Tạo tên ảnh dựa trên timestamp
      const imageName = `photo_${Date.now()}.jpg`;

      // Upload ảnh lên Cloudinary
      const data = new FormData();
      data.append("file", {
        name: imageName,
        type: "image/jpeg",
        uri: imageUri,
      });
      data.append("upload_preset", "ml_default");

      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dffuzgy5h/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUri(result.data.secure_url);
      return result.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleChangeAvatar = () => {
    const nextIndex = (avatarIndex + 1) % avatarImages.length;
    setAvatarIndex(nextIndex);
    setImageUri(getImageUri(avatarImages[nextIndex]));
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <View style={styles.DIV}>
          <Text style={styles.text1}>Edit Profile</Text>
        </View>
        <View style={styles.DIV}>
        <Image style={styles.AVATAR} source={avatarImages[avatarIndex]} />

          <TouchableOpacity
            onPress={handleChangeAvatar}
            style={{
              width: "80%",
              height: 60,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 20,
              borderWidth: 2,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Image
              style={{ marginRight: 20, marginLeft: 10, width: 50, height: 45 }}
              source={require("../../Image/iconChange.jpg")}
            />
            <Text
              style={{ color: "#635A8F", fontSize: 20, fontWeight: "bold" }}
            >
              Change Avatar
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Introduce yourself"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            style={{
              width: "80%",
              height: 60,
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 20,
              borderWidth: 2,
              marginBottom: 10,
              marginTop: 10,
            }}
            onPress={handleSaveProfile}
          >
            <Text
              style={{
                color: "#635A8F",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 50,
              }}
            >
              SEND
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  TextInput: {
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
  AVATAR: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  AVATAR2: {
    position: "absolute",
    top: 30,
    width: 50,
    height: 50,
  },
  DIV: {
    top: 80,
    alignItems: "center",
  },
  text1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
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
