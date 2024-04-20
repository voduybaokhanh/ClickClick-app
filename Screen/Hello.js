import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { SpaceComponent } from "../components";

const Hello = ({navigation}) => {
   useEffect (() => {
    setTimeout (() => {
      navigation.navigate('Login')
    },3000);
   },
   []);
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0, 0.09, 0.29, 0.50,1]}
        colors={["#3B21B7", "#8B64DA", "#FFFFFF", "#EFDAF9","#8B64DA"]}
        style={styles.linearGradient}
      >
        
          <View style={styles.DIV}>
            <Image
              style={styles.image}
              source={require("../Image/ClickClick.png")}
            /> 
               <Image
              style={styles.image}
              source={require("../Image/camera_hello.png")}
            /> 
             <SpaceComponent height={16}/>
          <ActivityIndicator color="#fff" size={22}/>
          </View> 
          
      </LinearGradient>
    
    </View>
  );
};

export default Hello;

const styles = StyleSheet.create({
  image:{
    
  },
  Sngg: {
    right: 10,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  imgGG: {},
  DIV: {
    justifyContent:"center",
    alignItems:"center", 
    flexDirection:"column",
    top:190
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
