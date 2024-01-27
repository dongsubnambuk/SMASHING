import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import Studyplus from './components/Studyplus';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import StudyList from './components/Studylist';
import StudyDetail from './components/StudyDetail';
import 'firebase/storage';
import Studymain from './components/Studymain';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './components/HomeScreen';
import Calendar from './components/Calendar';
import OfflineStudyScreen from './components/OfflineStudyScreen';
import OnlineStudyScreen from './components/OnlineStudyScreen';
import { SafeAreaView } from 'react-native-safe-area-context';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firestore };

const Stack = createStackNavigator();


const handlePlusButton = () => {
  // 버튼이 눌렸을 때 수행할 동작 추가
};


const App = ({ navigation }) => {
  // useEffect(() => {
  //   async function initializeFirebase() {
  //     // 스플래시 스크린 숨김 방지
  //     SplashScreen.preventAutoHideAsync();

  //     try {
  //       // Firebase 초기화
  //       await initializeApp(firebaseConfig);

  //       // 다른 초기화 작업 수행

  //       // 2초 후에 SplashScreen.hideAsync() 호출
  //       setTimeout(async () => {
  //         SplashScreen.hideAsync();
  //       }, 2000);
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   }

  //   initializeFirebase();
  // }, []);

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
       <Text style={styles.title}>SMASHING</Text>
        </SafeAreaView>

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
          name="StudyList"
          component={StudyList}
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
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="OfflineStudyScreen"
          component={OfflineStudyScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="OnlineStudyScreen"
          component={OnlineStudyScreen}
          options={{ headerShown: false }}
        />
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
    marginVertical: windowHeight * 0.05,
  },
  title: {
    top:"7%",
    fontSize: 35,
    color:"#3D4AE7",
    fontWeight:"bold"
   
  },
 
});



export default App;