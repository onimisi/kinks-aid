import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebaseConfigured from "../firebase";
import { Fontisto } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await firebaseConfigured
        .auth()
        .signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  if(firebaseConfigured.auth().currentUser) {
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Kinks <Fontisto name='bandage' size={24} color='black' /> Aid
      </Text>
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
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button title="Don't have an account yet? Sign up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#94675B",
    borderTopWidth: 3,
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
    borderRadius: 20 ,
    width: "70%"
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

export default Login;
