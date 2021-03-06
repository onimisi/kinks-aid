import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  ActionSheetIOS,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as axios from "axios";
import firebaseConfigured from "../firebase";
import { screen, text, form, button } from '../styles/GlobalStyles';

var fStorage = firebaseConfigured.storage();

const ImagePickerExample = ({ navigation }) => {
  const [image, setImage] = useState(undefined);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  // display actions screen to ask for image library or camer photo
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

  // Handle camera permissions and picture taking
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
          uploadImage(result.uri, "test-image").catch((err) =>
            console.error(err)
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle photo library permissions and image picking
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
          const imageName = `test-image-${randomNum.toString()}`;
          uploadImage(result.uri, imageName).catch((err) => console.error(err));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle image upload
  const uploadImage = async (uri, imageName) => {
    setIsLoading(true)
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = fStorage.ref().child("images/" + imageName); // set a ref to images directory in cloud storage
    ref.put(blob); // upload image to firebase storage

    const res = await axios.default({
      url: "https://capstone-kinksaid.web.app/api/v1/scan",
      method: "POST",
      data: {
        image: imageName,
      },
    });
    if (res) {
      navigation.push("Results", {
        detectedText: res.data.data,
        productName,
        category,
      });
      setImage(undefined);
      setCategory("");
      setProductName("");
      setIsLoading(false);
    }
  };

  return (
    <View style={[screen.container, styles.pageContainer]}>
    { isLoading &&
      <View style={styles.activityContainer}>
        <ActivityIndicator color={"brown"} size='large' />
        <Text style={{color: "#FFF", fontSize: 20}}> Analyzing... </Text>
      </View>
    }
      <Text style={text.inputLabel}>Product Name</Text>
      <TextInput
        style={form.input}
        value={productName}
        onChangeText={(product) => setProductName(product)}
        placeholder='E.g. Shea Moisture...'
      />
      <Text style={text.inputLabel}>Category</Text>
      <TextInput
        style={form.input}
        value={category}
        onChangeText={(category) => setCategory(category)}
        placeholder='E.g. shampoo...'
      />
      <TouchableOpacity style={button.primary} onPress={showAction}>
        <Text style={text.buttonText}> Scan List </Text>
      </TouchableOpacity>
      {{ image } && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: '#050C0F58'
  },  
});

export default ImagePickerExample;
