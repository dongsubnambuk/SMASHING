import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import Studyplus from './components/Studyplus';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import StudyList from './components/StudyList';
import StudyRoomScreen from './components/StudyRoomScreen';
import 'firebase/storage';
import Studymain from './components/Studymain';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import OfflineStudyScreen from './components/OfflineStudyScreen';
import OnlineStudyScreen from './components/OnlineStudyScreen';
import LoginPage from './components/LoginPage';
import SignUpFirstScreen from './components/SignUpFirstScreen';
import SerchId from './components/SerchId';
import SignUpTypeSelection from './components/SignUpTypeSelection';
import EmailSignUpComponent from './components/EmailSignUpComponent';
import NicknameCreationPage from './components/NicknameCreationPage';
import SignUpCompletionPage from './components/SignUpCompletionPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import PasswordRecoveryScreen from './components/PasswordRecoveryScreen';
import Passwordserchauth from './components/Passwordserchauth';
import Studyplusbtn from './components/Studyplusbtn';
import ChatScreen from './components/ChatScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth();

export { firestore };

const Stack = createStackNavigator();

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [fontsLoaded] = useFonts({
    Ultra: require('./assets/fonts/Ultra.ttf'),
    // 다른 폰트가 있다면 여기에 추가하세요.
  });

 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setShowHeader(true);

      } else {
        setIsLoggedIn(false);
        setShowHeader(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Initialize AsyncStorage for Firebase Auth
  useEffect(() => {
    (async () => {
      try {
        const firebaseData = await ReactNativeAsyncStorage.getItem('firebase');
        if (!firebaseData) {
          await ReactNativeAsyncStorage.setItem('firebase', 'initialized');
        }
      } catch (error) {
        console.error('Error initializing AsyncStorage for Firebase:', error);
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중이면 렌더링하지 않음
  }


  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
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
     {showHeader && (
        <SafeAreaView style={styles.header}>
          <Text style={styles.title}>SMASHING</Text>
        </SafeAreaView>
      )}

      <Stack.Navigator initialRouteName={isLoggedIn ? "BottomTabNavigationApp" : "SignUpFirstScreen"}>
        {isLoggedIn ? (
          <Stack.Screen
            name="BottomTabNavigationApp"
            component={BottomTabNavigationApp}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SignUpFirstScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <SignUpFirstScreen
                  {...props}
                  onLogin={(email, password) => handleLogin(email, password)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SerchId"
              component={SerchId}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PasswordRecoveryScreen"
              component={PasswordRecoveryScreen}
              options={{ headerShown: false }}
            />
                <Stack.Screen
              name="Passwordserchauth"
              component={Passwordserchauth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            {(props) => (
                <LoginPage
                  {...props}
                  onLogin={(email, password) => handleLogin(email, password)}
                />
              )}
            <Stack.Screen
              name="SignUpTypeSelection"
              component={SignUpTypeSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmailSignUpComponent"
              component={EmailSignUpComponent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NicknameCreationPage"
              component={NicknameCreationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpCompletionPage"
              component={SignUpCompletionPage}
              options={{ headerShown: false }}
            />
          </>
        )}
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
          name="StudyRoomScreen"
          component={StudyRoomScreen}
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
          name="CalendarScreen"
          component={CalendarScreen}
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
          <Stack.Screen
          name="Studyplusbtn"
          component={Studyplusbtn}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
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
    fontFamily: 'Ultra',
    top: "5%",
    fontSize: 35,
    color: "#3D4AE7",
    fontWeight: "bold"
  },
});

export default App;
