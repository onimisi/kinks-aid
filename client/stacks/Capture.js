import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogoTitle from '../components/LogoTitle';

// Screens
import Capture from '../pages/Capture';
import Results from '../pages/Results'

const CaptureStack = createStackNavigator();

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

export default CaptureStackScreen;
