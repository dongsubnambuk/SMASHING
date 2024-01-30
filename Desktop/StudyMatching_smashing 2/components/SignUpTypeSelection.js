import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpTypeSelection = () => {
  const navigation = useNavigation();

  const handleGoogleSignUp = () => {
    console.log('구글로 가입하기');
    // 구글 로그인 처리 및 회원가입 로직 추가
  };

  const handleEmailSignUp = () => {
    console.log('이메일로 가입하기');
    // 이메일 로그인 및 회원가입 로직 추가
    navigation.navigate('EmailSignUpComponent'); // Update with your actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가입하기</Text>

      {/* 구글로 시작하기 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignUp}>
        <Text style={styles.buttonText}>구글로 가입하기</Text>
      </TouchableOpacity>

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
    height: 40,
    backgroundColor: '#3D4AE7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#FCFCFC',
  },
});

export default SignUpTypeSelection;