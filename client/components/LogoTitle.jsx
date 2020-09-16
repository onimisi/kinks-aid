import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default function LogoTitle() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Kinks <Fontisto name='bandage' size={24} color='black' /> Aid
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "montserrat-regular",
  },
  userThumbnail: {
    color: "#94675B",
  },
});
