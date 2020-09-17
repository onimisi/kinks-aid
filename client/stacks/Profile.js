import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogoTitle from "../components/LogoTitle";

// Screens
import Profile from "../pages/Profile";

const profileStack = createStackNavigator();

const ProfilestackScreen = () => {
  return (
    <profileStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#ffdccc",
          borderBottomColor: "#7d2a42",
          borderBottomWidth: 1,
        },
      }}>
      <profileStack.Screen name='Profile' component={Profile} />
    </profileStack.Navigator>
  );
};

export default ProfilestackScreen;
