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

const AddPost = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState(""); // State để lưu nội dung bài viết
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null); // State để lưu đường dẫn của ảnh đã chụp\
  const [Imageconten, setImageconten] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // Ban đầu sử dụng camera sau

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Hàm chụp ảnh
  const takePicture = async () => {
    if (cameraRef.current) {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImageUri(photo.uri);
        setImageconten(photo.uri); // Gán giá trị của capturedImageUri cho Imageconten
      }
    }
  };

  // Hàm chụp lại ảnh
  const retakePicture = () => {
    // Xóa đường dẫn của ảnh đã chụp để mở lại camera
    setCapturedImageUri(null);
  };

  // Hàm gửi bài viết
  const sendPost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
  
      // Chỉ thực hiện upload ảnh nếu capturedImageUri đã được gán giá trị
      if (capturedImageUri) {
        // Upload ảnh lên Cloudinary và lấy đường dẫn ảnh từ phản hồi của Cloudinary
        const uploadedImageUrl = await uploadImage();
  
        const instance = await AxiosInstance();
        const body = {
          userid: parseInt(token),
          content: content,
          image: uploadedImageUrl, // Sử dụng đường dẫn ảnh đã được upload lên Cloudinary
        };
  
        const response = await instance.post("/add-posts.php", body);
        console.log("uploadImgaeuri " + uploadedImageUrl);
  
        // Reset capturedImageUri to null after successfully sending the post
        setCapturedImageUri(null);
      } else {
        // Nếu không có ảnh được chụp, gửi bài viết chỉ với nội dung
        const instance = await AxiosInstance();
        const body = {
          userid: parseInt(token),
          content: content,
        };
  
        const response = await instance.post("/add-posts.php", body);
        console.log(response.data);
      }
  
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  // Hàm upload ảnh
  const uploadImage = async () => {
    try {
      // Tạo tên ảnh dựa trên timestamp
      const imageName = `photo_${Date.now()}.jpg`;
  
      // Upload ảnh lên Cloudinary
      const data = new FormData();
      data.append("file", {
        name: imageName,
        type: "image/jpeg",
        uri: Imageconten,
      });
      data.append("upload_preset", "ml_default");
  
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dffuzgy5h/image/upload',
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Result:", result.data.secure_url);
  
      setImageconten(result.data.secure_url);
      return result.data.secure_url; // Trả về đường dẫn của ảnh đã upload
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Hàm chuyển đổi giữa camera trước và camera sau
  const switchCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../Image/arrow-left.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.iconsetting}
              source={require("../../Image/setting_icon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 60, marginLeft: 10 }}>
          <Text style={styles.creat}>Create new post</Text>
          <Text style={styles.text}>Share the moment with your friends</Text>
        </View>
        <View style={styles.itempost}>
          <View style={styles.namepost}>
            <Image
              style={styles.avt}
              source={require("../../Image/avatar1.png")}
            />
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text style={styles.name}>You</Text>
            </View>
          </View>
          <View style={{ width: "90%" }}>
            <Camera
              style={styles.camera}
              ref={cameraRef}
              type={cameraType}
            />
            {capturedImageUri && (
              <Image
                source={{ uri: capturedImageUri }}
                style={styles.capturedImage}
              />
            )}
          </View>
        </View>
        
        <View style={{ flexDirection:"row",alignItems:"center",bottom:47 }}>
       
          {!capturedImageUri ? (
            <View style={styles.cam}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../../Image/camera_icon.png")}
              />
            </TouchableOpacity>
            </View>
            
          ) : (
            <View style={styles.cam}>
              <TouchableOpacity style={styles.button} onPress={retakePicture}>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require("../../Image/delete.png")}
                />
              </TouchableOpacity>
            </View>
          )}
           <View style={styles.change_cam}>
              <TouchableOpacity style={styles.button} onPress={switchCameraType}>
                <Image
                  style={{ width: 60, height: 60, right:15,top:15}}
                  source={require("../../Image/change_camera.png")}
                />
              </TouchableOpacity>
         </View>
        </View>
        
        <View style={{ marginTop: 10, alignItems: "center"}}>
          <TextInput
            style={styles.mes}
            placeholder="Add a message"
            placeholderTextColor={"#635A8F"}
            value={content}
            onChangeText={setContent} // Cập nhật nội dung bài viết khi người dùng nhập
          />
        </View>
        {capturedImageUri && ( // Chỉ render khi có ảnh được chụp
          <TouchableOpacity
            style={{ alignItems: "center", bottom: 110 }}
            onPress={sendPost} // Gọi hàm sendPost khi ấn
          >
             <Image
                style={{ width: 40, height: 40}}
                source={require("../../Image/sent.png")}
              />
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  </View>
);
};


const styles = StyleSheet.create({
 change_cam:{
width:"100%",
alignItems:"flex-end"
 },
  cam:{
  top:5,
  width:'100%',
  alignItems:"center",
  position:"absolute",
  },
  text1: {
    fontSize: 20,
  },
  mes: {
    backgroundColor: "#E5D7F7",
    height: 50,
    borderRadius: 24,
    width: "80%",
    paddingHorizontal: 20,
    bottom: 200,
    fontSize: 17, // Updated to a numeric value
  },

  namepost: {
    flexDirection: "row",
    alignItems: "center",
    top: 12,
    width: "90%",
    marginBottom: 20,
  },
  iconmore: {
    marginLeft: "auto",
  },
  avt: {},
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itempost: {
    width: "auto",
    height: 500,
    backgroundColor: "#BFA7FF",
    top: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  creat: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  head: {
    paddingHorizontal: 10,
    top: 60,
    flexDirection: "row",
    justifyContent: "space-between",
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
  camera: {
    width: "100%",
    height: 350,
  },
  capturedImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});

export default AddPost;
