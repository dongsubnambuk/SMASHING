// BottomTabNavigationApp.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import StudyScreen from '../screens/StudyScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MypageScreen from '../screens/MypageScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigationApp() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#3D4AE7',
        tabBarStyle: {},
        headerShown: false,
        headerTitle: 'SMASHING',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Study"
        component={StudyScreen}
        options={{
          title: '스터디',
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu-book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: '게시판',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '일정',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-today" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MypageScreen}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <Icon name="contact-page" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigationApp;
