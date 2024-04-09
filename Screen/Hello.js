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
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        
          <View style={styles.DIV}>
            <Image
              style={styles.image}
              source={require("../Image/ClickClick.png")}
            /> 
          </View> 
          <View style={styles.DIV2}>
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
  DIV2:{
    
    position: "relative",
    top: 250,
    
  },
  DIV: {
    justifyContent:"center",
    position: "absolute",
    top: 155,
    left: 40,
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
