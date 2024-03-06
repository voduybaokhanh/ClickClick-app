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

const Notifications = ({}) => {
  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <View style={styles.containers}>
        <Text style={styles.Text15}> Forgot password?</Text>
        <Text style={styles.Text16}>
          Enter your email and we’ll send you the instructions on how to reset
          your password.
        </Text>

        <View style={styles.container}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            style={styles.TextInbutPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {/* <Image style={styles.eye} source={require("../../Image/eye.png")} /> */}

          <TextInput
            placeholder="Confirm PassWord"
            placeholderTextColor="#FFFFFF"
            style={styles.TextInbutPassword}
            value={password_confirm}
            onChangeText={(text) => setpassword_confirm(text)}
          />
          <Text style={styles.Text11}>Enter code OTP</Text>
          <OTPInput
            style={styles.inputOTP}
            numInputs={5}
            value={otp}
            onOtpChange={handleOtpChange}
          />
          {/* <Image style={styles.eye2} source={require("../../Image/eye.png")} /> */}

          <TouchableOpacity
            onPress={actionoRegister}
            style={styles.buttonSignin}
          >
            <Text style={styles.Text3}>Recover PassWord</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Notifications;
