import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebaseConfigured from "../firebase";
import axios from "axios";
import { screen, text } from '../styles/GlobalStyles';

export default function Profile({ navigation }) {
  const [user, setUser] = useState();

  const signOut = async () => {
    try {
      firebaseConfigured.auth().signOut();
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const currUser = firebaseConfigured.auth().currentUser;
    if (!user) {
      axios
        .get(`https://capstone-kinksaid.web.app/api/v1/users/${currUser.uid}`)
        .then((res) => {
          setUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if(!user) return null

  return (
    <View style={[screen.container, styles.container]}>
      <Text>Profile</Text>
      <Text>UserName: {user.data.data.userName} </Text>
      <Text>email: {user.data.data.userEmail} </Text>
      <Text>hair Type: {user.data.data.hairType} </Text>
      <View>
        <TouchableOpacity onPress={signOut} style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
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
    width: 150,
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
