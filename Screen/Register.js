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


const Register = () => {
  const [name, setName] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState(""); 
  return (
    <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient} >
    <View style={styles.container}>

     
    <TextInput
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInbutEmail}
              value={name}
              onChangeText={(text) => setName(text)}
            />
             <TextInput
                placeholder="Name"
                placeholderTextColor="#FFFFFF"
                style={styles.TextInbutPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
               
              />
              
              <TextInput
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                style={styles.TextInbutPassword}
               
              />
              <Image
                style={styles.eye}
                source={require("../Image/eye.png")}
              />

<TextInput
                placeholder="Confirm PassWord"
                placeholderTextColor="#FFFFFF"
                style={styles.TextInbutPassword}
               

                
              />

<Image
                style={styles.eye2}
                source={require("../Image/eye.png")}
              />

<View style={styles.Remember}>
  
              <Image source={require("../Image/boxRemember.png")} />
              <Text style={styles.Text1}>I Agree with <Text style={styles.Text10}>Privacy</Text> and
              <Text style={styles.Text10}> Policy</Text> </Text>
              {/* <Text style={styles.Text2}>Forgot Password</Text> */}
            </View>  

            <TouchableOpacity  style={styles.buttonSignin}>
              <Text style={styles.Text3}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.Sngg}>
              <Text style={styles.Text4}>Already have an account ?</Text>
              <Text style={styles.Text2}>Register</Text>
            </View>
     
        
       

      
    </View>
    </LinearGradient>

  )
}

export default Register

const styles = StyleSheet.create({

  

  Sngg: {
    right: 3,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding : 20,
  },

  Text2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3B21B2",
  },

  Text4: {
    fontSize: 20,
    marginRight: 20,
    color: "#FFFFFF",
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight : 15,
    borderRadius : 5,
    flex: 1,
    width: "100%",
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
    marginTop : 200,
  },

  TextInbutPassword: {
    fontSize: 20,
    paddingStart: 20,
    width: 330,
    right : 3,
    height: 60,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 25,
    margin: 30,
    padding: 20,
    marginBottom: 20,
    
  },

  eye: {
    position: "absolute",
    top: 437,
    right: 55,

  },

  eye2 : {
    position : "absolute",
    top: 547,
    right : 55,
  },

  Remember: {
    width: 300,
    left : 25,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  Text1: {
    fontSize: 17,
    fontWeight: "bold",
    color :  "#FFFFFF",
    
  
  },

  Text10: {
    fontSize: 17,
    fontWeight: "bold",
    color :  "#3B21B2",
    
    
  },

  Text2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3B21B2",
  },
  buttonSignin: {
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
  Text3: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 6,
  },
})

