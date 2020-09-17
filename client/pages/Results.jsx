import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import IngredientList from "../components/IngredientList";
import firebaseConfigured from "../firebase";
import { text, button } from '../styles/GlobalStyles';

export default function Results({ route, navigation }) {
  const { detectedText, productName, category } = route.params;
  const [results, setResults] = useState(detectedText);
  const [ingredients, setIngredients] = useState();
  const [matches, setMatches] = useState([]);
  const [user] = useState(firebaseConfigured.auth().currentUser);

  useEffect(() => {
    axios
      .get("https://capstone-kinksaid.web.app/api/v1/ingredients")
      .then((res) => {
        setIngredients(res.data.data);
        performCompare(res.data.data, detectedText);
      })
      .catch((error) => console.error(error));
    return () => {
      ingredients;
      results;
      user;
    };
  }, []);

  const performCompare = (ingList, resList) => {
    if (ingList) {
      let i = 0;
      let newArr = [];
      while (i <= resList.length - 1) {
        ingList.forEach((el) => {
          el.data.Name.toLowerCase() === resList[i]
            ? newArr.push(el.data)
            : newArr;
        });
        i++;
      }
      if (user !== null) {
        updateResults(newArr);
      }
      setMatches(newArr);
    } else {
      return null;
    }
  };

  const updateResults = async (matched) => {
    const hasUserScanned = await axios({
      url: "https://capstone-kinksaid.web.app/api/v1/results",
      method: "GET",
    });
    const found = hasUserScanned.data.find((el) => {
      return el.id === user.uid;
    });

    if (found) {
      await axios({
        url: `https://capstone-kinksaid.web.app/api/v1/results/${found.id}`,
        method: "PATCH",
        data: {
          elementsAdd: { matched, productName, category },
        },
      });
    } else {
      await axios({
        url: "https://capstone-kinksaid.web.app/api/v1/results",
        method: "POST",
        data: {
          userId: user.uid,
          element: { matched, productName, category },
        },
      });
    }
  };

  if (matches.length <= 0) {
    return (
      <View style={styles.container}>
        <Text>No matches found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.Pagecontainer}>
    <IngredientList data={matches} />
      <TouchableOpacity
        style={button.primary}
        onPress={() => {
          navigation.popToTop();
          navigation.navigate("Home");
          setMatches("");
          setResults("");
        }}>
        <Text style={text.buttonText}>Done</Text>
      </TouchableOpacity>
      {/*{user !== 'guest'? <Button title="save" />: <Button title="Login to save" />} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Pagecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  header: {
    marginTop: 15,
    fontFamily: "montserrat-bold",
  },
  button: {
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#c2b280",
    borderRadius: 20,
    width: "50%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
