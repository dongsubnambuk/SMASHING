// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import Studyplus from './components/Studyplus';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import StudyList from './components/Studylist';  // 파일 이름을 Studylist로 수정
import StudyDetail from './components/StudyDetail';
import 'firebase/storage';
import Studymain from './components/Studymain';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigationApp">
        <Stack.Screen
          name="BottomTabNavigationApp"
          component={BottomTabNavigationApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Studyplus"
          component={Studyplus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudyList"  // 이름을 StudyList로 수정
          component={StudyList}  // 컴포넌트 이름도 StudyList로 수정
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudyDetail"  
          component={StudyDetail}  
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Studymain"  
          component={Studymain}  
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
