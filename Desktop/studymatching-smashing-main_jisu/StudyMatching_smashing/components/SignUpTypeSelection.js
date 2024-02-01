import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const SignUpTypeSelection = () => {
  const navigation = useNavigation();

  // 구글 로그인 설정 초기화
  const googleSigninConfigure = async () => {
    try {
      await GoogleSignin.configure({
        webClientId:
          "527748083905-9e6utj9h4h7iq6mdn09dg97ujuicrds0.apps.googleusercontent.com",
      });
    } catch (error) {
      console.error("Google Signin configure error:", error);
    }
  };

  // 구글로 회원가입 처리
  const handleGoogleSignUp = async () => {
    try {
      await googleSigninConfigure(); // 구글 로그인 설정 초기화

      // 구글 로그인 실행
      const { idToken } = await GoogleSignin.signIn();

      // Firebase에서 제공하는 GoogleAuthProvider를 사용하여 credential 생성
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Firebase 인증 서비스를 사용하여 credential로 로그인
      await auth().signInWithCredential(googleCredential);

      // 로그인 후 원하는 화면으로 이동
      navigation.navigate("YourLoggedInScreen"); // Update with your actual screen name
    } catch (error) {
      console.error("Google sign up error:", error);
    }
  };

  const handleEmailSignUp = () => {
    console.log("이메일로 가입하기");
    // 이메일 로그인 및 회원가입 로직 추가
    navigation.navigate("EmailSignUpComponent"); // Update with your actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가입하기</Text>

      {/* 구글로 시작하기 버튼 */}
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignUp}
      />

      {/* 이메일로 시작하기 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleEmailSignUp}>
        <Text style={styles.buttonText}>이메일로 가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 20,
  },
  googleButton: {
    width: 200,
    height: 48,
    marginBottom: 15,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: "#3D4AE7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#FCFCFC",
  },
});

export default SignUpTypeSelection;
