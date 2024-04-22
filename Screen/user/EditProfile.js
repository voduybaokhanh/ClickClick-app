import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { SpaceComponent } from "../../components";

const EditProfile = ({ navigation }) => {
  const avatarImages = [
    require("../../Image/avata1.jpg"),
    require("../../Image/avata2.jpg"),
    require("../../Image/avata3.jpg"),
    require("../../Image/avata4.jpg"),
    require("../../Image/avata5.jpg"),
    require("../../Image/avata6.jpg"),
    require("../../Image/avata7.jpg"),
    require("../../Image/avata8.jpg"),
    require("../../Image/avata9.jpg"),
    require("../../Image/avata10.jpg"),
    require("../../Image/avata11.jpg"),
    require("../../Image/avata12.jpg"),
    require("../../Image/avata13.jpg"),
    require("../../Image/avata14.jpg"),
    require("../../Image/avata15.jpg"),
    require("../../Image/avata16.jpg"),
    require("../../Image/avata17.jpg"),
    require("../../Image/avata18.jpg"),
    require("../../Image/avata19.jpg"),
    require("../../Image/avata20.jpg"),
    require("../../Image/avata21.jpg"),
    require("../../Image/avata22.jpg"),

    // Thêm các đường dẫn hình ảnh khác vào đây
  ];
  const [currentAvatarIndex, setCurrentAvatarIndex] = React.useState(0);

  const handledEditAvatar = () => {
    console.log("nut handledEditAvatar");
    setCurrentAvatarIndex((currentAvatarIndex + 1) % avatarImages.length);
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
        <View onPress={handledEditAvatar} style={styles.DIV}>
          <Image
            style={styles.AVATAR}
            source={avatarImages[currentAvatarIndex]}
          />
          <TouchableOpacity
            onPress={handledEditAvatar}
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
              placeholder="Name"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInput}
              // value={}
              // onChangeText={(text) => setEmail(text)}
            />
             <TextInput
              placeholder="introduce yourself"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInput}
              // value={}
              // onChangeText={(text) => setEmail(text)}
            />
        </View>
      </LinearGradient>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  TextInput:{
    fontSize: 20,
    paddingStart: 20,
    width: "80%",
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    marginBottom:10,
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
