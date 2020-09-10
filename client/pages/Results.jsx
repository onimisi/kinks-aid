import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

export default function Results({ route, navigation }) {
  const [results, setResults] = useState();
  const [ingredients, setIngredients] = useState();
  const [matches, setMatches] = useState()

  const { detectedText } = route.params;

  useEffect(() => {
    console.log(detectedText.data.element.data);
    setResults(detectedText.data.element.data);
    axios
      .get("https://capstone-kinksaid.web.app/api/v1/ingredients")
      .then((res) => {
        setIngredients(res.data.data);
        performCompare(res.data.data, detectedText.data.element.data);
      })
      .catch((error) => console.error(error));
    return () => {
      ingredients;
      results;
    };
  }, []);

  const performCompare = (ingList, resList) => {
      console.log(ingList.length, resList.length)
    if (ingList) {
      let i = 0;
      let newArr = [];
      while (i <= resList.length - 1) {
        ingList.forEach((el) => {
          el.data.Name.toLowerCase() === resList[i]
            ? newArr.push(el.data)
            : newArr;
        });
        console.log(i);
        i++;
      }
      setMatches(newArr);
    } else {
      return null;
    }
  };

  return (
    <FlatList
      keyExtractor={(item, index) => {
        return "" + index;
      }}
      data={matches}
      renderItem={({ item }) => <Text>{item.Name}: {item.Category} - {item.Description}</Text>}
    />
  );
}
