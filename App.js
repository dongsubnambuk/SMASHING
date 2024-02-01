// App.js
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import MypageScreen from './screens/MypageScreen';
import MapScreen from './screens/MapScreen';
//import CalendarScreen from './screens/CalendarScreen';
//import NewScheduleScreen from './screens/NewScheduleScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const handlePlusButton = () => {
    // 버튼이 눌렸을 때 수행할 동작 추가
  };

  return (
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}>
        <SafeAreaView style={styles.header}>
          <Image style={styles.headerImage} resizeMode="contain" source={require('./assets/header.png')} />
          {/*
          <TouchableOpacity onPress={handlePlusButton} style={styles.plusButton}>
            <Entypo name="plus" size={windowWidth * 0.07} color="black" />
          </TouchableOpacity>
          */}
        </SafeAreaView>
        <Stack.Navigator //options={{ headerShown: false }} // 기본 헤더 숨기기
          screenOptions={{
          headerMode: 'none', // 상단의 뒤로가기 버튼 및 헤더 삭제
          }} initialRouteName="BottomTabNavigationApp">
          <Stack.Screen
            name="BottomTabNavigationApp"
            component={BottomTabNavigationApp}
          />
          <Stack.Screen
            name="MypageScreen"
            component={MypageScreen}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
          />
          {/*
          <Stack.Screen
            name="NewScheduleScreen"
            component={NewScheduleScreen}
          />
          */}
          {/*
          <Stack.Screen
            name="CalendarScreen"
            component={CalendarScreen}
          />
          */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.01,
  },
  headerImage: {
    width: windowWidth * 0.51,
  },
  plusButton: { 
  }
});

export default App;
