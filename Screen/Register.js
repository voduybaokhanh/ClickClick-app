import { StyleSheet, Text, View, Image,TextInput,
  TouchableOpacity,
  ScrollView, } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  return (
    <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient} >
    <View style={styles.container}>
    <TextInput
              placeholder="Name"
              placeholderTextColor="#FFFFFF"
              style={styles.TextInbutEmail}
              
              onChangeText={(text) => setName(text)}
            />
     
        
       

      
    </View>
    </LinearGradient>

  )
}

export default Register

const styles = StyleSheet.create({

  linearGradient: {
    paddingLeft: 15,
    paddingRight : 15,
    borderRadius : 5,
    flex: 1,
    width: "100%",
  },
})

