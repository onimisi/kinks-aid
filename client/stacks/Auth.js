import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogoTitle from '../components/LogoTitle';

// Screens
import Login from '../pages/Login';
import signUp from '../pages/SignUp'

const AuthStack = createStackNavigator();

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

export default AuthStackScreen;
