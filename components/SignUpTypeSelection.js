import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="#3D4AE7" />
        </TouchableOpacity>
       <Text style={styles.smasing}>SMASHING</Text>
      </View>

      <View style={styles.inner}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
   top:"6%",
   height:50,
   marginLeft:"3%",
    // flexDirection: 'row',
    alignSelf: 'flex-start', // 이 부분을 추가하여 상단에 배치
  },
  inner:{
    top:"10%"
  },
  smasing: {
    // top:"5%",
    fontSize: 50,
    color: '#3D4AE7',
    fontFamily: 'Ultra',
    lineHeight: 54,
     alignItems: 'center',
     fontWeight: 'bold',
  },
  title: {
    top:"6%",
    marginLeft:"3%",
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 20,
  },
  button: {
    marginLeft:"5%",
    top:"8%",
    width: "90%",
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#3D4AE7',
    fontSize: 20, 
    fontWeight: 'bold',
  },
});

export default SignUpTypeSelection;