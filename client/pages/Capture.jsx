import React, { useState } from 'react';
import { Button, Image, Text, View, Platform, Alert, ActionSheetIOS, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import  firebaseConfigured from '../firebase'

var fStorage = firebaseConfigured.storage();

const ImagePickerExample = ({ navigation }) => {
  const [image, setImage] = useState(undefined);
  const [result, setResult] = useState('🔮')


  const showAction = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Generate number", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(Math.floor(Math.random() * 100) , 1);
        } else if (buttonIndex === 2) {
          setResult("🔮");
        }
      }
    );

    const getPermissionAsync = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
  
    const _pickImage = async () => {
      getPermissionAsync()
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
        if (!result.cancelled) {
          setImage(result.uri);
          uploadImage(result.uri, "test-image")
          .then(() => {
            Alert.alert("Success");
          })
          .catch( (err) => {
            Alert.alert(err)
          })
        }
        
      } catch (E) {
        console.log(E);
      }
    };
  
    const uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = fStorage.ref().child("images/" + imageName);
      return ref.put(blob);
    }
    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={_pickImage} />
        {{image} && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}
        <Text>{result}</Text>
        <Button title="Results" onPress={() => navigation.navigate('Results')} />
        <TouchableOpacity onPress={showAction}>
          <Text> Show Ios Action </Text>
        </TouchableOpacity>
      </View>
    );
  }

export default ImagePickerExample;
 