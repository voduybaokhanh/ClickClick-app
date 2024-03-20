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
import AxiosInstance from "../../helper/Axiostance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({navigation}) => {
  const [email, setEmail] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState(""); // State để lưu trữ giá trị của password

  const actionforgotsPassword = () => {
    navigation.navigate('forgot')
  }
  const actionRegister = () => {
    navigation.navigate('registerOTP')
  }
  const actionLogin = async () => {
    try {
      const body = { email, password };
      const instance = await AxiosInstance();
      const result = await instance.post("/login.php", body);
      const token = await AsyncStorage.getItem("token");
      if (result.status) {
        await AsyncStorage.setItem("token", result.user.id.toString());
        alert("Đăng nhập thành công");
        navigation.navigate('BottomTab')

        // Token đã được lưu trữ thành công, thực hiện các thao tác tiếp theo nếu cần
      } else {
        alert("đăng nhập thất bại");
      }
      console.log('id: ' + result.user.id);
      console.log('token: '+token);
    } catch (error) {
      console.error("Lỗi khi thực hiện đăng nhập: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.DIV}>
            <Image
              style={styles.image}
              source={require("../../Image/ClickClick.png")}
            />
            <Text
              style={styles.TextSingIn}
              source={require("../../Image/signIn.png")}
            >
              Sign in
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInbutEmail}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                style={styles.TextInbutPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Image
                style={styles.eye}
                // source={require("../../Image/eye.png")}
              />
            </View>
            <View style={styles.Remember}>
              <Image source={require("../../Image/boxRemember.png")} />
              <Text style={styles.Text1}>Remember Me?</Text>
              <Text onPress={actionforgotsPassword} style={styles.Text2}>Forgot Password</Text>
            </View>
            <TouchableOpacity onPress={actionLogin} style={styles.buttonSignin}>
              <Text style={styles.Text3}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.Sngg}>
              <Text style={styles.Text4}>Or sign in with</Text>
              <Image
                style={styles.imgGG}
                source={require("../../Image/google.png")}
              />
            </View>
            <View style={styles.Sngg}>
              <Text style={styles.Text4}>Don’t have an account?</Text>
              <Text onPress={actionRegister} style={styles.Text2}>Register</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Sngg: {
    right: 10,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  imgGG: {},
  Text4: {
    fontSize: 20,
    marginRight: 10,
    color: "#FFFFFF",
  },
  buttonSignin: {
    paddingStart: 20,
    width: 330,
    right: 30,
    height: 60,
    backgroundColor: "#635A8F",
    borderRadius: 25,
    margin: 10,
    padding: 5,
    alignItems: "center",
  },
  Text3: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 6,
  },
  Text1: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  Text2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3B21B2",
  },

  Remember: {
    width: 320,
    right: 25,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  eye: {
    position: "absolute",
    top: 27,
    right: 60,
  },
  DIV: {
    position: "absolute",
    top: 155,
    left: 35,
  },
  TextInbutPassword: {
    fontSize: 20,
    paddingStart: 20,
    width: 320,
    right: 30,
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    marginBottom: 20,
  },
  TextInbutEmail: {
    fontSize: 20,
    paddingStart: 20,
    width: 320,
    right: 30,
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    margin: 10,
    padding: 5,
    marginBottom: 20,
  },
  TextSingIn: {
    marginTop: 30,
    marginBottom: 20,
    right: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
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
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
