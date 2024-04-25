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
  // Hàm gửi bài viết
const sendPost = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("Token (userid) not found in AsyncStorage");
      return;
    }

    // Chỉ thực hiện upload ảnh nếu capturedImageUri đã được gán giá trị
    if (content) {
      // Upload ảnh lên Cloudinary và lấy đường dẫn ảnh từ phản hồi của Cloudinary
      const uploadedImageUrl = await uploadImage();

      const instance = await AxiosInstance(); 
      const body = {
        userid: parseInt(token),
        content: content,
        image: uploadedImageUrl, // Sử dụng đường dẫn ảnh đã được upload lên Cloudinary
      };

      const response = await instance.post("/add-posts.php", body);
      console.log("Uploaded Image URL:", uploadedImageUrl);

      // Reset capturedImageUri và content sau khi gửi bài viết thành công
      setCapturedImageUri(null);
      setContent(""); // Đặt giá trị content về rỗng sau khi gửi bài viết
    } else {
      const uploadedImageUrl = await uploadImage();
      // Nếu không có nội dung được nhập, gửi bài viết chỉ với ảnh
const instance = await AxiosInstance();
      const body = {
        userid: parseInt(token),
        content: "", // Đặt content là rỗng khi gửi bài viết chỉ với ảnh
        image: uploadedImageUrl,
      };

      const response = await instance.post("/add-posts.php", body);

      // Reset capturedImageUri sau khi gửi bài viết thành công
      setCapturedImageUri(null);
      setContent(""); // Đặt giá trị content về rỗng sau khi gửi bài viết
      console.log("Data:", response.data);
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
            <View style={{ marginLeft: 10,flexDirection:"row" }}>
              <Text style={styles.name}>You</Text>
            </View>
          </View>
      <View style={styles.viewCam}>
            {
              !capturedImageUri ? 
              <Camera
              style={styles.camera}
              ref={cameraRef}
type={cameraType}
            />
            :
            <Image
            source={{ uri: capturedImageUri }}
            style={styles.capturedImage}
          />
            }
        
          </View>
        
          {!capturedImageUri ? (
             <View style={{flexDirection:"row",justifyContent:"space-between", width:"90%", marginTop:15}}>
              <View style={styles.change_cam}>
          
              </View>
             <View style={styles.cam}>
              <TouchableOpacity  onPress={takePicture}>
                <Image
                  source={require("../../Image/camera_icon.png")}
                />
              </TouchableOpacity>
              </View>
              <View style={styles.change_cam}>
          <TouchableOpacity style={styles.button} onPress={switchCameraType}>
            <Image
              style={{ width: 60, height: 60}}
              source={require("../../Image/change_camera.png")}
            />
          </TouchableOpacity>
     </View>
              </View>
        
      ) : (
        <View  style={{flexDirection:"row",justifyContent:"space-between", width:"90%", marginTop:15}}>
           <View style={styles.change_cam}>
          
          </View>
        <View style={styles.cam}>
          <TouchableOpacity onPress={retakePicture}>
            <Image
              source={require("../../Image/delete_icon.png")}
            />
          </TouchableOpacity>
        </View>
         <View style={styles.sent}>
         <TouchableOpacity onPress={sendPost}  >
            <Image
             style={{ width: 60, height: 60}}
               source={require("../../Image/icon_sent.png")}
             />
         </TouchableOpacity>
         </View>
         </View>
      )}
         
       
     </View>
        
        <View style={{ alignItems: "center"}}>
          <TextInput
            style={styles.mes}
            placeholder="Add a message"
            placeholderTextColor={"#FFFFFF"}
            value={content}
            onChangeText={setContent} // Cập nhật nội dung bài viết khi người dùng nhập
          />
        </View>
      </ScrollView>
    </LinearGradient>
  </View>
);
};


const styles = StyleSheet.create({
  sent:{
    justifyContent:"center",
    width: 60, height: 60,
    marginTop:5
  },
  change_cam:{
    justifyContent:"center",
    width: 60, height: 60,
    marginTop:5
  },
  cam:{
   
  },
  viewCam:{
width:"90%",
height:"62%"
  },
  
  text1: {
    fontSize: 20,
  },
  mes: {
    backgroundColor: "#635A8F",
    height: 50,
    borderRadius: 24,
    width: "90%",
    paddingHorizontal: 20,
    fontSize: 17,
    marginTop:40,
    color:"white"// Updated to a numeric value
  },

  namepost: {
    flexDirection: "row",
    alignItems: "center",
    top: 12,
    width: "90%",
    marginBottom: 20,
    height:"8%"
  },
  iconmore: {
    marginLeft: "auto",
  },
  
  name: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
  itempost: {
width: "auto",
    height:500,
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
  width:"100%",height:"100%"
  },
  capturedImage: {
    width:"100%",height:"100%"
  },
});

export default AddPost;