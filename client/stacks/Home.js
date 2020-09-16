import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogoTitle from '../components/LogoTitle';

// Screens
import Home from '../pages/Home';
import ScanHistory from '../pages/ScanHistory';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#ffdccc",
          borderBottomColor: "#7d2a42",
          borderBottomWidth: 1,
        },
      }}>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='ScanHistory' component={ScanHistory} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
