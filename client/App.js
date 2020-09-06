import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Capture from './pages/Capture';
import Results from './pages/Results';
import ScanHistory from './pages/ScanHistory';

const HomeStack = createStackNavigator();
const CaptureStack = createStackNavigator();
const JournalStack = createStackNavigator();


const HomeStackScreen = ( ) => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ScanHistory" component={ScanHistory} />
    </HomeStack.Navigator>
  )
}

const CaptureStackScreen = ( ) => {
  return (
    <CaptureStack.Navigator>
      <CaptureStack.Screen name="Capture" component={Capture} />
      <CaptureStack.Screen name="Results" component={Results} />
    </CaptureStack.Navigator>
  )
}

const JournalStackScreen = ( ) => {
  return (
    <JournalStack.Navigator>
      <JournalStack.Screen name="Journal" component={Journal} />
    </JournalStack.Navigator>
  )
}


export default function App() {
  const Tabs = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeStackScreen} />
        <Tabs.Screen name="Capture" component={CaptureStackScreen} />
        <Tabs.Screen name="Journal" component={JournalStackScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
