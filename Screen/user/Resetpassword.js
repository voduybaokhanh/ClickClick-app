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
import AxiosInstance from "./../../helper/Axiostance";


const Resetpassword = ({navigation}) => {
  const [password, setPassword] = useState("");
  const [password_confirm, setpassword_confirm] = useState("");

  const [otp, setOtp] = useState(""); // Tạo state để lưu trữ giá trị otp

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const OTPInput = ({ numInputs, value, onOtpChange }) => {
    const handleChange = (index, value) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOtp(newOTP);
        onOtpChange(newOTP.join('')); // Truyền giá trị OTP lên component cha
    };
  
    const inputs = Array(numInputs).fill();
  
    return (
      <View style={styles.otpContainer}>
        {inputs.map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={otp[index]}
            onChangeText={(value) => handleChange(index, value)}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
    );
  };
  const actionResetPassword = async () => {
    try {
      const body = {password, password_confirm, otp};
      const instance = await AxiosInstance();
      const result = await instance.post("/reset-password.php", body);
      console.log(body);
      if (result.status) {
        alert("Password changed successfully");
        navigation.navigate("Login");
        

        // Token đã được lưu trữ thành công, thực hiện các thao tác tiếp theo nếu cần
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện: ", error);
    }
  };
  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.Text10}> Forgot password?</Text>
          <Text style={styles.Text1}>
            Enter your email and we'll send you the instruction on how to reset
            your password.
          </Text>
          {/* <Text style={styles.Text2}>Enter your email address</Text>    */}
        </View>
        <View>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            style={styles.TextInbutEmail}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Confilrm Password"
            placeholderTextColor="#FFFFFF"
            style={styles.TextInbutpassword}
            value={password_confirm}
            onChangeText={(confirmpassword) => setpassword_confirm(confirmpassword)}
          />
        </View>
        <Text style={styles.Text11}>Enter code OTP</Text>
        <OTPInput numInputs={6} value={otp} onOtpChange={handleOtpChange} />
        <TouchableOpacity onPress={actionResetPassword} style={styles.buttonRecover}>
          <Text style={styles.Text3}>Recover PassWord</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({
    Text11:{
        fontSize: 17,
        fontWeight: "bold",
        color: "#FFFFFF",
        margin: 10,
        left:10,
      },
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
    height: 70,
    backgroundColor: "#635A8F",
    borderRadius: 25,
    marginTop: 20,
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

  TextInbutpassword: {
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  input: {
    height: 50,
    width: 40,
    borderWidth: 2,
    borderColor: "#4100c4",
    textAlign: "center",
    marginRight: 20,
    fontSize: 20,
    left: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
});
