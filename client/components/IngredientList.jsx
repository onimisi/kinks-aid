import React from "react";
import { View, Text, StyleSheet, FlatList,SafeAreaView, } from "react-native";
import IngerdientCard from "./IngredientCard";

export default function IngredientList({ data }) {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item, index) => {
        return "" + index;
      }}
      data={data}
      renderItem={({ item }) => (
        <IngerdientCard
          name={item.Name}
          category={item.Category}
          description={item.Description}
          rating={item.Rating}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 20,
  },
});
