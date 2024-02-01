import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const GoogleSignUpComponent = () => {
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.configure(); // Google Signin 초기화

      // 구글 로그인 실행
      const { idToken } = await GoogleSignin.signIn();

      // Firebase에서 제공하는 GoogleAuthProvider를 사용하여 credential 생성
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Firebase 인증 서비스를 사용하여 credential로 로그인
      await auth().signInWithCredential(googleCredential);

      // 회원가입 후 추가 작업이 필요하다면 여기에 작성
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google로 가입하기</Text>

      {/* Google로 시작하기 버튼 */}
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 48,
    marginTop: 20,
  },
});

export default GoogleSignUpComponent;
