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
            backgroundColor: "#ffdccc",
          borderBottomColor: "#7d2a42",
          borderBottomWidth: 1,
        },
      }}>
      <JournalStack.Screen name='Journal' component={Journal} />
    </JournalStack.Navigator>
  );
};

export default JournalStackScreen;