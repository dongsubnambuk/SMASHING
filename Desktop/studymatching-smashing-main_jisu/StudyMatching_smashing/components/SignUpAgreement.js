import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpAgreement = () => {
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    // 회원가입 버튼 눌렀을 때 실행되는 함수
    // 여기에 필요한 로직을 추가하고, 페이지를 전환하는 코드를 작성
    navigation.navigate('SignUpAgreement');
  };

  return (
    <View style={styles.container}>
      {/* Check box outline blank */}
      <View style={styles.checkBox} />
      {/* Vector */}
      <View style={styles.vector} />

      {/* 약관 동의 */}
      <Text style={styles.agreementTitle}>약관동의</Text>

      {/* 체크 박스 및 텍스트 반복 */}
      {/* 만 14세 이상입니다. */}
      <View style={styles.checkBox} />
      <View style={styles.vector} />
      <Text style={styles.agreementText}>만 14세 이상입니다.</Text>

      {/* [필수] 이용약관 동의 */}
      <View style={styles.checkBox} />
      <View style={styles.vector} />
      <Text style={styles.agreementText}>[필수] 이용약관 동의</Text>

      {/* [필수] 개인정보 수집 및 이용 동의 */}
      <View style={styles.checkBox} />
      <View style={styles.vector} />
      <Text style={styles.agreementText}>[필수] 개인정보 수집 및 이용 동의</Text>

      {/* Line */}
      <View style={styles.line} />

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 360,
    height: 640,
    backgroundColor: '#FFFFFF',
  },
  checkBox: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 14,
    top: 146,
    backgroundColor: '#3D4AE7', // 예시 색상, 필요에 따라 수정
  },
  vector: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#3D4AE7', // 예시 색상, 필요에 따라 수정
  },
  agreementTitle: {
    position: 'absolute',
    width: 74,
    height: 24,
    left: 20,
    top: 102,
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
  },
  agreementText: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3E3E3E',
  },
  line: {
    position: 'absolute',
    width: 345,
    height: 1.05,
    left: 7,
    top: 186.46,
    backgroundColor: '#3D4AE7', // 예시 색상, 필요에 따라 수정
    transform: [{ rotate: '0.17deg' }],
  },
  signUpButton: {
    position: 'absolute',
    width: 336,
    height: 42,
    left: 14,
    top: 318,
    backgroundColor: 'rgba(61, 74, 231, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#FCFCFC',
  },
});

export default SignUpAgreement;
