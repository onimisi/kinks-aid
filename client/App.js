import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import firebaseConfigured from "./firebase";

import signUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Capture from "./pages/Capture";
import Results from "./pages/Results";
import ScanHistory from "./pages/ScanHistory";

const HomeStack = createStackNavigator();
const CaptureStack = createStackNavigator();
const JournalStack = createStackNavigator();
const AuthStack = createStackNavigator();
const profileStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#DDCDBA",
          borderBottomColor: "#882C2E",
          borderColor: "red",
        },
      }}>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='ScanHistory' component={ScanHistory} />
      {/* <HomeStack.Screen name='Journal' component={Journal} /> */}
    </HomeStack.Navigator>
  );
};

const CaptureStackScreen = () => {
  return (
    <CaptureStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#DDCDBA",
          borderBottomColor: "#882C2E",
          borderColor: "red",
        },
      }}>
      <CaptureStack.Screen name='Capture' component={Capture} />
      <CaptureStack.Screen name='Results' component={Results} />
    </CaptureStack.Navigator>
  );
};

const JournalStackScreen = () => {
  return (
    <JournalStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#DDCDBA",
          borderBottomColor: "#882C2E",
          borderColor: "red",
        },
      }}>
      <JournalStack.Screen name='Journal' component={Journal} />
    </JournalStack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#DDCDBA",
          borderBottomColor: "#882C2E",
          borderColor: "red",
        },
      }}>
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='SignUp' component={signUp} />
    </AuthStack.Navigator>
  );
};

const ProfilestackScreen = () => {
  return (
    <profileStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#DDCDBA",
          borderBottomColor: "#882C2E",
          borderColor: "red",
        },
      }}>
      <profileStack.Screen name='Profile' component={Profile} />
    </profileStack.Navigator>
  );
}

const LogoTitle = () => {
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

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Kinks <Fontisto name='bandage' size={24} color='black' /> Aid
      </Text>
    </View>
  );
};

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const Tabs = createBottomTabNavigator();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const unsubscribe = firebaseConfigured
      .auth()
      .onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
  }, []);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  // if (initializing) return null;

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
            } else if (route.name === "Login") {
              iconName = focused ? "ios-log-in" : "ios-log-in";
            } else if (route.name === "Account") {
              iconName = focused ? "ios-person" : "ios-person";
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
        {user ? (
          <Tabs.Screen name='Account' component={ProfilestackScreen} />
        ) : (
          <Tabs.Screen name='Login' component={AuthStackScreen} />
        )}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
