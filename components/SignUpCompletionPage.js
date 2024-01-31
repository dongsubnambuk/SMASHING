import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SignUpCompletionPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.smashing}>SMASHING</Text>
      <Text style={styles.successText}>회원가입이 완료되었습니다</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginPage')}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smashing: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#3D4AE7',
    marginBottom: 10,
  },
  successText: {
    fontSize: 18,
    color: '#3D4AE7',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    top: '25%',
    width: '85%',
    height: 50,
    backgroundColor: '#FFFFFF', // 배경을 흰색으로 설정
    borderWidth: 1, // 테두리 추가
    borderColor: '#3D4AE7', // 테두리 색상 설정
    borderRadius: 10,
    justifyContent: 'center', // 텍스트 수직 중앙 정렬
  },
  buttonText: {
    color: '#3D4AE7', // 텍스트 색상 설정
    fontSize: 20,
    textAlign: 'center', // 텍스트 수평 중앙 정렬
    fontWeight: 'bold',
  },
});

export default SignUpCompletionPage;
