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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { StatusBar } from "expo-status-bar";

const data =[
  {label: 'Mọi người' , value : '1'},
  {label: 'Bạn A' , value : '2'},
  {label: 'Bạn B' , value : '3'},
  {label: 'Bạn C' , value : '4'},
  {label: 'Bạn D' , value : '5'},
]
const Home = () => {
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light_content"/>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
      <View style={styles.header}>
         <Image style={styles.iconsetting} source={require('../../Image/setting_icon.png')}/>
         <View style={{alignItems:"center"}}>
            <Dropdown
              style={styles.search}
              placeholder="Mọi người "
              placeholderStyle={styles.placeholderStyle}
              iconstyle={styles.iconStyle}
              selectedTextStyle={styles.placeholderStyle}
              data={data}
              labelField="label"
              valueField="value"
              onChange={item => {
                setValue(item.value);
                setIsfocus(false);
              }}
              />
          </View>
          <Image style={styles.iconsetting} source={require('../../Image/setting_icon.png')}/>
      </View>
      <View style={styles.itempost}>
       <View style={styles.namepost}>
        <Image style={styles.avt}
        source={require('../../Image/avatar1.png')}/>
        <View style={{flexDirection:"column" , marginLeft:10}}>
            <Text style={styles.name}>Dian Cinne</Text>
            <Text style={styles.time}>5 minute</Text>
        </View>
        <Image style={styles.iconmore}
        source={require('../../Image/more_icon.png')}/>
       </View>
       <View style={{}}>
       <Image 
       source={require('../../Image/picture.png')}/>
       </View>
      </View>
      </LinearGradient>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  namepost:{
    flexDirection:"row",
     alignItems:"center",
     top:12,
    
     
  },
  iconmore:{
   marginLeft:150
  },
  avt:{
   marginLeft:16
  },
  time:{
    color:'white',
  },
  name:{
    color:'white',
    fontSize:15,
  },
  itempost:{
    width:'auto',
    height:400,
    backgroundColor: "#BFA7FF",
    top:80,
    borderRadius:20,
  },
  header:{
    flexDirection:"row" , 
    alignItems:"center" , 
    justifyContent:"space-between",
    top:63,
    
  },
  iconsetting:{
    
  },
  iconStyle:{
    color:"#fff"
  },
  placeholderStyle:{
    color:"#fff",
    fontSize:20,
  },
  search:{
      height: 53,
      paddingLeft:20,
      paddingRight:10,
      backgroundColor:"#443A74",
      borderRadius:24,
      fontSize:16,
      width:160
      
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
})