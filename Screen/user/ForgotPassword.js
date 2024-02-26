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
 
  

const ForgotPassword = () => {
   const [name, setName] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState("");
  return (
    <LinearGradient
    locations={[0.05, 0.17, 0.8, 1]}
    colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
    style={styles.linearGradient} >
        <View style={styles.container}>
        
        
         <Text style={styles.Text10}> Forgot password?</Text> 
            <Text style={styles.Text1}>Enter your email and we'll send you the
             instruction on how to reset your password.</Text> 

             {/* <Text style={styles.Text2}>Enter your email address</Text>    */}
            </View>  
            <view>
                 <TextInput
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInbutEmail}
              value={name}
              onChangeText={(password) => setName(password)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="eye eye-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>

            
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="eye eye-open">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          
            
            </view>
           
            <view> 
                   <TextInput
              placeholder="Confilrm Password"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInbutpassword}
              value={name}
              onChangeText={(confirmpassword) => setName(confirmpassword)}
            />

            </view>
             

<TouchableOpacity  style={styles.buttonRecover}>
              <Text style={styles.Text3}>Recover PassWord</Text>
            </TouchableOpacity>
      
    
    
    
    </LinearGradient>
  )
}

export default ForgotPassword;

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
        height: 60,
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
        height: 60,
        borderColor: "#FFFFFF",
        borderWidth: 3,
        borderRadius: 25,
        margin: 30,
        padding: 20,
        marginBottom: 20,
        marginTop : 20,
      },

      
    TextInbutpassword: {
        fontSize: 20,
        paddingStart: 20,
        width: 330,
        right: 3,
        height: 60,
        borderColor: "#FFFFFF",
        borderWidth: 3,
        borderRadius: 25,
        margin: 30,
        padding: 20,
        marginBottom: 20,
        marginTop : 20,
      },
      

    Text10 : {
        left : 5,
        fontSize : 30,
        fontWeight : "bold",
        color: "#FFFFFF",
        padding: 5,      
        marginTop : 150,
    },

    Text1 : {
        width: 380,
        padding: 15,
        fontSize : 13,
        
        color: "#FFFFFF",
    },
        Text2 : {
            width: 380,
            padding: 15,
            fontSize : 13,            
            color: "#FFFFFF",

    },
    

    

    linearGradient: {
        paddingLeft: 15,
        paddingRight : 15,
        borderRadius : 5,
        flex: 1,
        width: "100%",
      },
})