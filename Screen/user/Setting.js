import {
    StyleSheet,
    View,
    Image,
    ActivityIndicator,
    Text,
    TouchableOpacity,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import React, { useEffect } from "react";
  import { SpaceComponent } from "../../components";
  
const Setting = ({navigation}) => {

    const handledEditProfile = () =>{
      navigation.navigate('EditProfile')

    }
    const handledChange = () =>{
        navigation.navigate('resetPass')
    }
    const handledDelete = () =>{
        console.log("nut delete");
    }
    const handedLogout = () =>{
        console.log("nut handedLogout");
    }
  return (
    <View style={styles.container}>
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      
        <View style={styles.DIV}>
         <Text  style={styles.text1}>Setting</Text>
        </View> 
        <View style={{top:100}}>
            <TouchableOpacity onPress={handledEditProfile} style={{ width: "100%", height: 60, flexDirection: 'row', alignItems: 'center',backgroundColor:'#ffffff',borderRadius:20,borderWidth:2,marginBottom:20}}>
                <Image style={{marginRight:20,marginLeft:10}} source={require('../../Image/logoEdit.png')}/>
                <Text style={{color:'#635A8F',fontSize:20,fontWeight:'bold'}}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handledChange} style={{ width: "100%", height: 60, flexDirection: 'row', alignItems: 'center',backgroundColor:'#ffffff',borderRadius:20,borderWidth:2,marginBottom:20}}>
                <Image style={{marginRight:20,marginLeft:10}} source={require('../../Image/logoChange.png')}/>
                <Text style={{color:'#635A8F',fontSize:20,fontWeight:'bold'}}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handledDelete} style={{ width: "100%", height: 60, flexDirection: 'row', alignItems: 'center',backgroundColor:'#ffffff',borderRadius:20,borderWidth:2,marginBottom:320}}>
                <Image style={{marginRight:20,marginLeft:10}} source={require('../../Image/logoDelete.png')}/>
                <Text style={{color:'#635A8F',fontSize:20,fontWeight:'bold'}}>Delete account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handedLogout} style={{ width: "100%", height: 60, flexDirection: 'column', alignItems: 'center',backgroundColor:'#635A8F',borderRadius:20,borderWidth:2,marginBottom:20}}>
                <Text style={{color:'#ffffff',fontSize:30,fontWeight:'bold',lineHeight:50}}>Log out</Text>
            </TouchableOpacity>
        </View>
       
    </LinearGradient>
  
  </View>
  )
}

export default Setting

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
    DIV:{
        top:80,
        alignItems:'center'
    },
    text1: {
     fontSize:40,
     fontWeight: "bold",
     color:"#ffffff",
    marginBottom:30,
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
  