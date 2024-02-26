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
import AxiosInstance from "../../helper/AxiosInstance";


const Forgetpassword = ({navigation}) => {
  const [email, setemail] = useState("")

  const actionForgot = async () => {
    try {
      const body = { email };
      const instance = await AxiosInstance();
      const result = await instance.post("/get-otp.php", body);
      if (result.status) {
        alert("Đã gửi mã otp");
        navigation.navigate('resetPass');
        // Token đã được lưu trữ thành công, thực hiện các thao tác tiếp theo nếu cần
      } else {
        alert("gửi mã otp thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện: ", error);
    }
  }


  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.Text10}> Forgot password?</Text>
        <Text style={styles.Text1}>
          Enter your email and we'll send you the instruction on how to reset
          your password.
        </Text>

        <Text style={styles.Text2}>Enter your email address</Text>
      

      <TextInput
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        style={styles.TextInbutEmail}
        value={email}
        onChangeText={(text) => setemail(text)}
      />

      <TouchableOpacity onPress={actionForgot} style={styles.buttonRecover}>
        <Text style={styles.Text3}>Recover PassWord</Text>
      </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  Text3: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    padding: 10,
    right: 6,
    textAlign: "center",
  },

  buttonRecover: {
    paddingStart: 20,
    width: 330,
    left: 30,
    height: 65,
    backgroundColor: "#635A8F",
    borderRadius: 25,
    marginTop: 10,
    padding: 5,
    alignItems: "center",
  },

  TextInbutEmail: {
    fontSize: 20,
    paddingStart: 20,
    width: 330,
    right: 3,
    height: 70,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    margin: 30,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
  },

  Text10: {
    left: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    padding: 5,
    marginTop: 150,
  },

  Text1: {
    width: 380,
    padding: 15,
    fontSize: 13,

    color: "#FFFFFF",
  },
  Text2: {
    width: 380,
    padding: 15,
    fontSize: 13,
    color: "#FFFFFF",
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
  container:{
    top:60,
    right: 10
  }
});
