import * as React from 'react';
import { Button, Image, View, Platform, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase/app';
import 'firebase/storage'
import * as firebaseConfig from '../config.json';

firebase.initializeApp(firebaseConfig.default);
var storage = firebase.storage();

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}
        <Button title="Results" onPress={() => this.props.navigation.navigate('Results')} />
      </View>
    );
  }

  componentDidMount() {
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.uploadImage(result.uri, "test-image")
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

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }
}
