import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogoTitle from '../components/LogoTitle';

// Screens
import Journal from '../pages/Journal';

const JournalStack = createStackNavigator();

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

export default JournalStackScreen;