// App.js
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigationApp from "./components/BottomTabNavigationApp";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig as firebaseConfigApp } from "./firebaseConfig";
import SignUpFirstScreen from "./components/SignUpFirstScreen";
import JoinPage from "./components/JoinPage";
import SignUpAgreement from "./components/SignUpAgreement";
import SignUpTypeSelection from "./components/SignUpTypeSelection";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { AuthProvider, useAuth } from "./components/AuthContext";

const app = initializeApp(firebaseConfigApp);
const firestore = getFirestore(app);

export { firestore };

const Stack = createStackNavigator();

const NextPageComponent = () => (
  <View>
    <Text>다음 페이지</Text>
  </View>
);

const App = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const { onAuthStateChanged } = auth;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    googleSigninConfigure(); // 추가된 부분

    return () => unsubscribe();
  }, []);

  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId: '527748083905-9e6utj9h4h7iq6mdn09dg97ujuicrds0.apps.googleusercontent.com',
    });
  };

  const onGoogleButtonPress = async () => {
    try {
      await googleSigninConfigure(); // 구글 로그인 설정 초기화

      // 구글 로그인 실행
      const { idToken } = await GoogleSignin.signIn();
      
      // Firebase에서 제공하는 GoogleAuthProvider를 사용하여 credential 생성
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Firebase 인증 서비스를 사용하여 credential로 로그인
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUpFirstScreen">
          <Stack.Screen
            name="SignUpFirstScreen"
            component={SignUpFirstScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JoinPage"
            component={JoinPage}
            options={{ title: '회원가입' }}
          />
          <Stack.Screen
            name="NextPage"
            component={NextPageComponent}
            options={{ title: '다음 페이지' }}
          />
          <Stack.Screen
            name="SignUpAgreement"
            component={SignUpAgreement}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpTypeSelection"
            component={SignUpTypeSelection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomTabNavigationApp"
            component={BottomTabNavigationApp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

        {/* Google Signin Button */}
        <GoogleSigninButton
          style={{ width: 200, height: 48, marginTop: 20 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
