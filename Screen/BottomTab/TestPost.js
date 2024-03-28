haimport React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const TestPost = () => {
    const [imageLocal, setImageLocal] = useState('');
    const [imageOnline, setImageOnline] = useState('');
    const cameraRef = useRef(null);

   const takePhoto = async () => {
    try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const photo = await cameraRef.current.takePictureAsync();
            setImageLocal(photo.uri);

            // Tạo tên ảnh dựa trên timestamp
            const imageName = `photo_${Date.now()}.jpg`;

            // Upload ảnh lên server
            const data = new FormData();
            data.append('image', {
                name: imageName, // Đảm bảo rằng name là một chuỗi (string)
                type: 'image/jpeg',
                uri: photo.uri,
            });
            data.append('upload_preset', 'ml_default');
            console.log('FormData:',data); // Log FormData object to check content
            const result = await axios.post('http://192.168.1.7:8686/upload_file.php',data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Result:', result.data);

            setImageOnline(result.data.image);
            
        } else {
            console.log('Camera permission denied');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={cameraRef} />
            <Button title='Take photo' onPress={takePhoto} />
            {imageLocal !== '' && (
                <Image source={{ uri: imageLocal }} style={{ width: 200, height: 200 }} />
            )}
            {imageOnline !== '' && (
                <Image source={{ uri: imageOnline }} style={{ width: 300, height: 300 }} />
            )}
        </View>
    );
};

export default TestPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
});
