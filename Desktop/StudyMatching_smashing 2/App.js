// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import Studyplus from './components/Studyplus';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigation">
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigationApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Studyplus"
          component={Studyplus}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
