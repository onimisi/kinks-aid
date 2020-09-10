import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  ActionSheetIOS,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as axios from 'axios';
import firebaseConfigured from "../firebase";

var fStorage = firebaseConfigured.storage();

const ImagePickerExample = ({ navigation }) => {
  const [image, setImage] = useState(undefined);

  const showAction = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Camera", "Gallery"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          _takePhoto();
        } else if (buttonIndex === 2) {
          _pickImage();
        }
      }
    );
  };

  const _takePhoto = async () => {
    try {
      const { granted } = await Permissions.askAsync(Permissions.CAMERA);
      if (granted) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          setImage(result.uri);
          uploadImage(result.uri, "test-image")
            .then(() => {
              Alert.alert("Success");
            })
            .catch((err) => {
              Alert.alert(err);
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _pickImage = async () => {
    try {
      const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          setImage(result.uri);
          const randomNum = Math.floor(Math.random() * 60); 
          const imageName = `test-image-${ randomNum.toString() }`
          uploadImage(result.uri, imageName)
          .catch((err) => {
              alert(err);
          });
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = fStorage.ref().child("images/" + imageName);
    ref.put(blob);

    const res = await axios.default({
      url: 'https://capstone-kinksaid.web.app/api/v1/scan',
      method: 'POST',
      data: {
        image: imageName,
        userId: 'oukanah'
      }
    })

    const updateResult = await axios.default({
      url: 'https://capstone-kinksaid.web.app/api/v1/results',
      method: 'POST',
      data: {
        userId: 'oukanah',
        element: res.data
      }
    })
    navigation.navigate('Results', {
      detectedText: updateResult.data
    });
  };

  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity onPress={showAction}>
        <Text> Pick an Image </Text>
      </TouchableOpacity>
      {{ image } && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
      borderTopColor: "#94675B",
      borderTopWidth: 3,
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
  },
})

export default ImagePickerExample;
