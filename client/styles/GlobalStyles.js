import { StyleSheet } from "react-native";

const screen = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 30,
        paddingHorizontal: 25,
    }
})

const text = StyleSheet.create({
    header: {
        fontSize: 25,
        marginRight: 15,
        fontFamily: "montserrat-regular",
        color: '#293241'
    },
    subHeader: {
        fontSize: 25,
        marginRight: 15,
        fontFamily: "montserrat-regular",
        color: '#293241'
    }
})

export { screen, text }