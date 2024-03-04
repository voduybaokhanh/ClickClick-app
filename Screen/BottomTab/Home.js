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
import AxiosInstance from "./../../helper/AxiosInstance";
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
  const [isThatim, setIsThatim] = useState(false);
  const handleBaocao = () => {
    // Xử lý khi icon được ấn
    console.log('Icon đã được ấn');
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };
  
  const handleThatim = () => {
    // Xử lý khi icon được ấn
    console.log('Icon đã được ấn');
    setIsThatim(!isThatim);
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };
  return (
    <View style={styles.container}>
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
          <TouchableOpacity >
        <Image style={styles.iconsetting} source={require('../../Image/setting_icon.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
      <View style={styles.itempost}>
       <View style={styles.namepost}>
        <Image style={styles.avt}
        source={require('../../Image/avatar1.png')}/>
        <View style={{flexDirection:"column" , marginLeft:10}}>
            <Text style={styles.name}>Dian Cinne</Text>
            <Text style={styles.time}>5 minute</Text>
        </View>
        <TouchableOpacity  style={{ marginLeft:'auto'}} onPress={handleBaocao}>
        <Image style={styles.iconmore}
        source={require('../../Image/more_icon.png')}/>
        </TouchableOpacity>
       </View>
       <View style={{width:'90%', marginBottom:20}}>
       <Image style={{width:'auto'}}
       source={require('../../Image/picture.png')}/>
       <View style={{width:'90%',alignSelf: 'center' }}>
          <Text style={styles.status}>This is a beautiful sky that i took last week. it’s great, right ?</Text>
       </View>
       </View>
       <View style={styles.tim_mes}>
          <TouchableOpacity onPress={handleThatim}>
            <Image  
             source={isThatim  ?  require('../../Image/hearted.png') : require('../../Image/heart.png') }
             />
          </TouchableOpacity>
          <TextInput style={styles.mes} placeholder="Add a message" 
             placeholderTextColor={"#635A8F"}
            />
       </View>
      </View>
      <View style={styles.itempost}>
       <View style={styles.namepost}>
        <Image style={styles.avt}
        source={require('../../Image/avatar1.png')}/>
        <View style={{flexDirection:"column" , marginLeft:10}}>
            <Text style={styles.name}>Dian Cinne</Text>
            <Text style={styles.time}>5 minute</Text>
        </View>
        <TouchableOpacity  style={{ marginLeft:'auto'}} onPress={handleBaocao}>
        <Image style={styles.iconmore}
        source={require('../../Image/more_icon.png')}/>
        </TouchableOpacity>
       </View>
       <View style={{width:'90%', marginBottom:20}}>
       <Image style={{width:'auto'}}
       source={require('../../Image/picture.png')}/>
       <View style={{width:'90%',alignSelf: 'center' }}>
          <Text style={styles.status}>This is a beautiful sky that i took last week. it’s great, right ?</Text>
       </View>
       </View>
       <View style={styles.tim_mes}>
          <TouchableOpacity onPress={handleThatim}>
            <Image  
             source={isThatim  ?  require('../../Image/hearted.png') : require('../../Image/heart.png') }
             />
          </TouchableOpacity>
          <TextInput style={styles.mes} placeholder="Add a message" 
             placeholderTextColor={"#635A8F"}
            />
       </View>
      </View>
      
      </ScrollView>
      </LinearGradient>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1, 
    position:'relative'
  },
  mes:{
  backgroundColor:"#E5D7F7",
  marginLeft:10,
  height:35,
  borderRadius:24,
  width:'90%',
  paddingHorizontal:10,
  
  },
  tim_mes:{
   flexDirection:'row',
  width:'90%',
  bottom:10
  },
  status:{
    color:'white',
    fontSize:14,
    position: 'absolute',
    bottom:5,
    alignSelf: 'center'
  },
  namepost:{
    flexDirection:"row",
     alignItems:"center",
     top:12,
    width:'90%',
    marginBottom:20
  },
  iconmore:{
   marginLeft:'auto'
  },
  avt:{
   
  },
  time:{
    color:'white',
  },
  name:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
  },
  itempost:{
    width:'auto',
    height:'auto',
    backgroundColor: "#BFA7FF",
    top:80,
    borderRadius:20,
    alignItems:"center",
    marginBottom:20,
  },
  header:{
    flexDirection:"row" , 
    alignItems:"center" , 
    justifyContent:"space-between",
    top:63,
    position:'relative'
    
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
      fontSize:13,
      width:160,
      fontWeight:'bold'
      
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