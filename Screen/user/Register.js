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

const Register = ({ navigation, route }) => {
  const {params} = route;
  const email = params.email;
  const [name, setName] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState("");
  const [password_confirm, setpassword_confirm] = useState("");
  const [otp, setOtp] = useState(''); // Tạo state để lưu trữ giá trị otp

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

  const actionLogin = () => {
    navigation.navigate("Login");
  };
  const actionoRegister = async () => {
    try {
      const body = { email,name, password, password_confirm, otp };
      const instance = await AxiosInstance();
      const result = await instance.post("/register.php", body);
      console.log(body);
     // console.log(JSON.stringify(result));
      if (result.status) {
        alert("Registration successful");
        navigation.navigate("Login");
        

        // Token đã được lưu trữ thành công, thực hiện các thao tác tiếp theo nếu cần
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện đăng ký: ", error);
    }
  };
  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
          <Image style={styles.image}
              source={require("../../Image/arrow-left.png")}
             />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.label}>Register</Text>
        </View>
        <View style={styles.khung}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#FFFFFF"
          style={styles.TextInbut}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          style={styles.TextInbut}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder="Confirm PassWord"
          placeholderTextColor="#FFFFFF"
          style={styles.TextInbut}
          value={password_confirm}
          onChangeText={(text) => setpassword_confirm(text)}
        />
        
        <Text style={styles.Text11}>Enter code OTP</Text>
        <OTPInput numInputs={6} value={otp} onOtpChange={handleOtpChange} />
        
        <View style={styles.Remember}>
          <Image source={require("../../Image/boxRemember.png")} />
          <Text style={styles.Text1}>
            I Agree with <Text style={styles.Text10}>Privacy</Text> and
            <Text style={styles.Text10}> Policy</Text>{" "}
          </Text>
          {/* <Text style={styles.Text2}>Forgot Password</Text> */}
        </View>

        <TouchableOpacity onPress={actionoRegister} style={styles.buttonSignin}>
          <Text style={styles.Text3}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.Sngg}>
          <Text style={styles.Text4}>Already have an account ?</Text>
          {/* <Text style={styles.Text2}>Sign In</Text> */}
          <Text onPress={actionLogin} style={styles.Text2}>
            Login
          </Text>
        </View>
        </View>
      </View>

    </LinearGradient>
  );
};

export default Register;

const styles = StyleSheet.create({
  back:{

  },
  image:{
    
  },
  header:{
    marginTop:70,
    alignItems:"flex-start",
    
  },
  khung:{
    justifyContent:"center",
    alignItems:"center"
  },
  label:{
   fontSize:30,
   color:"white",
   fontWeight:'bold'
  },
  Text11:{
    marginTop:10,
    marginBottom:10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  Sngg: {
    right: 3,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },

  Text2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3B21B2",
  },

  Text4: {
    fontSize: 20,
    marginRight: 10,
    color: "#FFFFFF",
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
  TextInbut: {
    paddingHorizontal:10,
    fontSize: 20,
    width:'100%',
    height: 65,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    marginTop: 20,
  },
  eye: {
    position: "absolute",
    top: 334,
    right: 20,
  },

  eye2: {
    position: "absolute",
    top: 450,
    right: 20,
  },

  Remember: {
    width: 300,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  Text1: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  Text10: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3B21B2",
  },

  Text2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3B21B2",
  },
  buttonSignin:{
    width: 330,
    height: 60,
    backgroundColor: "#635A8F",
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent:"center"
  },
  Text3: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  input: {
    height: 50,
    width: 40,
    borderWidth: 2,
    borderColor: "#4100c4",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 5,
    marginBottom: 20,
    color:"white"
  },
  container:{
    flex:1,
    padding:10,
    justifyContent:"center",
  }
});
