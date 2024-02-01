import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-web'

const PostNews = () => {
    return (
        <View>
            <Text>PostNews</Text>
            <Image styles={styles.Image} />
            <Button title="Chup anh" />
            <Button title="Chon anh" />
            <TextInput placeholder="Tieu de" />
            <Button title="POST" />
        </View>
    )
}

export default PostNews

const styles = StyleSheet.create({
    Image: {
        width: 100,
        height: 100,
    }
})