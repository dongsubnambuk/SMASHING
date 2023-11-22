import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Studymain from './Studymain';
import Studyserachbtn from './Studyserachbtn';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      {/* 홈 화면 내용 */}
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
      </TouchableOpacity>
    </View>
  );
}

function StudyScreen({ navigation }) {
  return (
    <View>
     
     <Studymain/>
     <Studyserachbtn/>
      <TouchableOpacity onPress={() => navigation.navigate(Studymain)}>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(Studyserachbtn)}>
      </TouchableOpacity>
    </View>
  );
}

function NotificationScreen({ navigation }) {
  return (
    <View>
      {/* 게시판 화면 내용 */}
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        
      </TouchableOpacity>
    </View>
  );
}

function MypageScreen({ navigation }) {
  return (
    <View>
      {/* 마이페이지 화면 내용 */}
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        
      </TouchableOpacity>
    </View>
  );
}

function BottomTabNavigationApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#3D4AE7',
          tabBarStyle: {},
          headerShown: false, // 헤더 표시 여부
          headerTitle: 'SMASHING', // 헤더 제목
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
    </NavigationContainer>
  );
}

export default BottomTabNavigationApp;
