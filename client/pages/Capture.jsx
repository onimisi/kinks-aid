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

var fStorage = firebaseConfigured.storage();

const ImagePickerExample = ({ navigation }) => {
  const [image, setImage] = useState(undefined);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false)

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
          uploadImage(result.uri, "test-image").catch((err) =>
            console.error(err)
          );
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
          const imageName = `test-image-${randomNum.toString()}`;
          uploadImage(result.uri, imageName).catch((err) => console.error(err));
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  const uploadImage = async (uri, imageName) => {
    setIsLoading(true)
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = fStorage.ref().child("images/" + imageName);
    ref.put(blob);

    const res = await axios.default({
      url: "https://capstone-kinksaid.web.app/api/v1/scan",
      method: "POST",
      data: {
        image: imageName,
      },
    });
    if (res) {
      console.log(res.data.data);
      setImage(undefined);
      setCategory("");
      setProductName("");
      setIsLoading(false);
      navigation.push("Results", {
        detectedText: res.data.data,
        productName,
        category,
      });
    }
  };

  return (
    <View style={styles.pageContainer}>
    { isLoading &&
      <View style={styles.activityContainer}>
        <ActivityIndicator color={"brown"} size='large' />
        <Text style={{color: "#FFF", fontSize: 20}}> Analyzing... </Text>
      </View>
    }
      <Text>Product Name: </Text>
      <TextInput
        style={styles.inputBox}
        value={productName}
        onChangeText={(product) => setProductName(product)}
        placeholder='Product Name'
      />
      <Text>Category: </Text>
      <TextInput
        style={styles.inputBox}
        value={category}
        onChangeText={(category) => setCategory(category)}
        placeholder='category'
      />
      <TouchableOpacity style={styles.buttonPrimary} onPress={showAction}>
        <Text style={styles.buttonText}> Scan a List </Text>
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
    borderTopColor: "#94675B",
    borderTopWidth: 1,
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
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  buttonPrimary: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#c2b280",
    borderRadius: 20,
    width: "70%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ImagePickerExample;
