import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Fontisto } from "@expo/vector-icons";
import axios from "axios";
import firebaseConfigured from '../firebase'
import { screen, text } from '../styles/GlobalStyles';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [hairType, sethairType] = useState("");

  const creatNewAccount = () => {
    axios({
      url: "https://capstone-kinksaid.web.app/api/v1/signUp",
      method: "POST",
      data: {
        userEmail: email,
        password: password,
        userName: fullName,
        hairType: hairType,
      },
    })
      .then(() => {
        signIn();
      })
      .catch((err) => console.error(err));
  };

  const signIn = async () => {
    try {
      await firebaseConfigured
        .auth()
        .signInWithEmailAndPassword(email, password);
        navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[screen.container, styles.container]}>
      <Text style={styles.headerText}>
        Kinks <Fontisto name='bandage' size={24} color='black' /> Aid
      </Text>
      <TextInput
        style={styles.inputBox}
        value={fullName}
        onChangeText={(fullName) => setfullName(fullName)}
        placeholder='Full Name'
      />
      <TextInput
        style={styles.inputBox}
        value={hairType}
        onChangeText={(hairType) => sethairType(hairType)}
        placeholder='Hair Type'
      />
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder='Email'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder='Password'
        secureTextEntry={true}
      />
      <TextInput
        style={styles.inputBox}
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholder='Confirm Password'
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={creatNewAccount}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
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
  buttonSignup: {
    fontSize: 12,
  },
});
