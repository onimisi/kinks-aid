import React from "react";
import { View, Text, Button, StyleSheet, Animated } from "react-native";
import { List } from 'react-native-paper';

export default function IngerdientCard({ name, category, description, rating, product, productType }) {
  return (
    <View style={styles.cardContainer} >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{name} - Toxic</Text>
      </View>
      <Text style={styles.subheader}>{category}</Text>
      <Text style={styles.content}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 20,
    fontFamily:'montserrat-medium',
    textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    fontFamily:'montserrat-bold',
  },
  content: {
    fontSize: 14,
    fontFamily:'montserrat-regular',
  }
});
