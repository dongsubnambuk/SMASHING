// BottomTabNavigationApp.js
import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import StudyScreen from '../screens/StudyScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MypageScreen from '../screens/MypageScreen';
import CalendarScreen from '../screens/CalendarScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

const iconSize = windowWidth * 0.08; // 하단바 아이콘 크기

function BottomTabNavigationApp() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#3D4AE7',
        tabBarStyle: {height: windowHeight * 0.09, paddingBottom: windowHeight * 0.01}, // 하단바 높이
        tabBarLabelStyle: {fontSize: windowWidth * 0.035},
        headerShown: false,
        headerTitle: 'SMASHING',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Study"
        component={StudyScreen}
        options={{
          title: '스터디',
          tabBarIcon: ({ color }) => (
            <Icon name="menu-book" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: '게시판',
          tabBarIcon: ({ color }) => (
            <Icon name="dashboard" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '일정',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-today" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MypageScreen}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => (
            <Icon name="contact-page" color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigationApp;
