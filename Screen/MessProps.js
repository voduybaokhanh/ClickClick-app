/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";

function Mess() {

  const [textInput, setTextInput] = useState < String > ('');

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={{ flexDirection: item.role == 'sender' ? 'row-reverse' : 'row', marginTop: 10 }}>
        {item.type == 'image' ? <Image style={{ borderRadius: 10 }} source={item.image} /> : <Text style={[{ height: 50, backgroundColor: '#635A8F', textAlign: 'center', fontSize: 20, padding: 10, color: 'white' }, item.role == 'acceptor' ? { borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 } : { borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15 }]}>{item.text}</Text>}
      </View>
    )
  }, [])

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ImageBackground style={{ width: '100%', height: '100%', zIndex: -1 }} resizeMode="cover" source={require('./src/assets/background.png')}>

          <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, backgroundColor: '#CBB6EE', }}>
            <Icon name='chevron-back' color={'#635A8F'} size={35} />
            <Image style={{ height: 60, width: 60 }} source={require('./src/assets/avatar.png')} />

            <Text style={{ fontSize: 20, fontWeight: '500', color: 'white', marginLeft: 20 }}>Edein Vindain</Text>
            <Feather style={{ position: "absolute", right: 10 }} name='more-vertical' color={"#635A8F"} size={35} />
          </View>
          <Text style={{ textAlign: 'center', color: '#ffffff' }}>3:23pm</Text>
          <FlatList style={{ marginTop: 20, paddingHorizontal: 10, marginBottom: 65 }} data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
          <View style={{ flexDirection: 'row', columnGap: 10, position: 'absolute', bottom: 0, height: 60, width: '100%', backgroundColor: '#CBB6EE', justifyContent: 'center', alignItems: 'center' }}>
            <TextInput style={{ width: '80%', height: '60%', paddingHorizontal: 10, borderRadius: 20, backgroundColor: '#635A8F', padding: 0, color: 'white', fontSize: 17 }} value={textInput.toString()} onChangeText={(e) => setTextInput(e)} />
            <Pressable>
              <Image source={require('./src/assets/send.png')} />
            </Pressable>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}


export default Mess;

const data = [
  {
    id: 1,
    type: 'image',
    role: 'acceptor',
    image: require("./src/assets/image1.png")
  },
  {
    id: 2,
    type: 'text',
    role: 'acceptor',
    text: 'Hello, have a great day!',
  },
  {
    id: 3,
    type: 'text',
    role: 'sender',
    text: 'Thank you broo!',
  },
  {
    id: 4,
    type: 'image',
    role: 'sender',
    text: 'Hello, have a great day!',
    image: require("./src/assets/image2.png")
  },
]
