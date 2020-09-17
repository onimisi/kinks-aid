import { StyleSheet } from "react-native";

const screen = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
});

const text = StyleSheet.create({
  header: {
    fontSize: 25,
    marginRight: 15,
    fontFamily: "montserrat-regular",
    color: "#293241",
  },
  subHeader: {
    fontSize: 20,
    marginRight: 15,
    fontFamily: "montserrat-regular",
    color: "#293241",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "montserrat-medium",
    color: "#6D6875",
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
  },
});

const button = StyleSheet.create({
  primary: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FCB1A6",
    borderColor: "#8D2A42",
    borderRadius: 20,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});

const form = StyleSheet.create({
  input: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#8D2A42",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});

export { screen, text, button, form };
