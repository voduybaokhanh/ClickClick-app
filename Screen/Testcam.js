import React, { useState, useEffect, useRef } from "react";
import { View, Button, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import AxiosInstance from "../helper/AxiosInstance";

export default function Testcam() {
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoTaken(true);
    }
  };

  const takePicture = async () => {
    if (cameraPermission) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      setPhotoTaken(true);
      setShowCamera(false);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("No image to upload");
      return;
    }
  
    const formData = new FormData();
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
  
    formData.append('image', {
      uri: image,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  
    try {
      const response = await AxiosInstance.post('upload_file.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);
      alert(response.data.message);
      setPhotoTaken(false);
      setImage(null);
      setShowCamera(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {showCamera && cameraPermission === null ? (
        <View />
      ) : showCamera && cameraPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        showCamera && (
          <Camera
            style={{ flex: 1, width: "100%" }}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            />
          </Camera>
        )
      )}
      {!photoTaken && showCamera && (
        <Button
          title="Take Picture"
          onPress={takePicture}
          disabled={photoTaken}
        />
      )}
      {!photoTaken && showCamera && (
        <Button
          title="Pick an image from camera roll"
          onPress={pickImage}
          disabled={photoTaken}
        />
      )}
      {image && <Button title="Upload Image" onPress={uploadImage} />}
    </View>
  );
}
