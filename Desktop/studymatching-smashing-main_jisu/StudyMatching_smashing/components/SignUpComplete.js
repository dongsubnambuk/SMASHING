import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpComplete = () => {
  return (
    <View style={styles.container}>
      {/* 회원가입 첫 화면 SMASING */}
      <Text style={styles.smashing}>SMASING</Text>

      {/* 회원가입이 완료되었습니다. */}
      <Text style={styles.completeText}>회원가입이 완료되었습니다.</Text>

      {/* Button */}
      <View style={styles.buttonContainer}>
        {/* seconday */}
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 360,
    height: 640,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  smashing: {
    width: 286,
    height: 24,
    fontFamily: 'Ultra',
    fontSize: 50,
    lineHeight: 24,
    color: '#3D4AE7',
    marginTop: 260,
  },
  completeText: {
    width: 360,
    height: 16,
    fontFamily: 'SeoulNamsan CB',
    fontSize: 18,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.4,
    color: '#3D4AE7',
    marginTop: 44,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    gap: 8,
    position: 'absolute',
    width: 360,
    height: 42,
    left: 0,
    top: 514,
  },
  secondaryButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 336,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3D4AE7',
    borderRadius: 8,
    flex: 1,
  },
  loginText: {
    width: 44,
    height: 16,
    fontFamily: 'SeoulNamsan CBL',
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#3D4AE7',
  },
});

export default SignUpComplete;
