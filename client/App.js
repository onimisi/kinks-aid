import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Fontisto, MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from 'expo';

import Login from "./pages/Login";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Capture from "./pages/Capture";
import Results from "./pages/Results";
import ScanHistory from "./pages/ScanHistory";

const HomeStack = createStackNavigator();
const CaptureStack = createStackNavigator();
const JournalStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#DDCDBA",
            borderBottomColor: "#882C2E",
            borderColor:"red"
          }
    }}>
      <HomeStack.Screen name='Home' component={Home}/>
      <HomeStack.Screen name='ScanHistory' component={ScanHistory} />
    </HomeStack.Navigator>
  );
};

const CaptureStackScreen = () => {
  return (
    <CaptureStack.Navigator screenOptions={{
      headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#DDCDBA",
            borderBottomColor: "#882C2E",
            borderColor:"red"
          }
    }}>
      <CaptureStack.Screen name='Capture' component={Capture} />
      <CaptureStack.Screen name='Results' component={Results} />
    </CaptureStack.Navigator>
  );
};

const JournalStackScreen = () => {
  return (
    <JournalStack.Navigator screenOptions={{
      headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#DDCDBA",
            borderBottomColor: "#882C2E",
            borderColor:"red"
          }
    }}>
      <JournalStack.Screen name='Journal' component={Journal} />
    </JournalStack.Navigator>
  );
};

const LogoTitle = (props) => {
  const styles = StyleSheet.create({
    headerContainer: {
      display:"flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: 300,
      marginLeft: 100,
      height: 30
    },
    headerText: {
      fontSize: 24,
      fontFamily: "montserrat-regular",
    },
    userThumbnail: {
      color: "#94675B"
    }
  })
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Kinks <Fontisto name="bandage" size={24} color="black" /> Aid</Text>
      <MaterialIcons style={styles.userThumbnail} name="account-circle" size={28} color="black" onPress={() => alert('yay! actions!') } />
    </View>
  );
}

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat-light': require("./assets/fonts/Montserrat-Light.ttf"),
    'montserrat-regular': require("./assets/fonts/Montserrat-Regular.ttf"),
    'montserrat-bold': require("./assets/fonts/Montserrat-Bold.ttf")
  });
  };

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const Tabs = createBottomTabNavigator();

    if (!dataLoaded) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setDataLoaded(true)}
        />
      );
    }

    return (
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
              } else if (route.name === "Capture") {
                iconName = focused ? "ios-aperture" : "ios-aperture";
              } else if (route.name === "Journal") {
                iconName = focused ? "ios-book" : "ios-book";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#94675B",
            inactiveTintColor: "gray",
          }}>
          {/* "#882C2E" */}
          <Tabs.Screen name='Home' component={HomeStackScreen} />
          <Tabs.Screen name='Capture' component={CaptureStackScreen} />
          <Tabs.Screen name='Journal' component={JournalStackScreen} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
}
