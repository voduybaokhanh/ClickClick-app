import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const Hello = ({navigation}) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />

    </View>
  )
}

export default Hello

const styles = StyleSheet.create({
    button:{
        with: 100,
        height: 100,
    },
})