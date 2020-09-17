import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons} from "@expo/vector-icons";
import * as Font from "expo-font"; // uploading fonts
import { AppLoading } from "expo";
import firebaseConfigured from "./firebase";

// Navigation Stacks
import AuthStackScreen from './stacks/Auth';
import CaptureStackScreen from './stacks/Capture';
import JournalStackScreen from './stacks/Journal';
import HomeStackScreen from './stacks/Home';
import ProfilestackScreen from './stacks/Profile';

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

  if (initializing) return null;

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
          activeTintColor: "#8D2A42",
          inactiveTintColor: "#6D6875",
        }}>

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
