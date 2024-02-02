import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebaseConfig';

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const EmailSignUpComponent = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [id, setid] = useState('');

  const handleNext = async () => {
    // 비밀번호 검증
    if (password.length < 6) {
      console.error('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    // 비밀번호와 확인 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      console.error('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // Firebase Authentication을 사용하여 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(getAuth(app), email, password);

      // 사용자의 UID 가져오기
      const userId = userCredential.user.uid;

      // Firebase Authentication에서 제공하는 updateProfile 함수를 사용하여 사용자 프로필 업데이트
      await updateProfile(userCredential.user, {
        displayName: id,
      });

      // Firebase Realtime Database에 사용자 정보 저장
      saveUserDataToFirebase(userId);

      // 회원가입 성공 후 다음 페이지로 이동
      navigation.navigate('NicknameCreationPage', { userId, email, id, password });
    } catch (error) {
      console.error('회원가입 실패:', error.message);
    }
  };

  const saveUserDataToFirebase = (userId) => {
    const userRef = ref(database, 'users/' + userId);
    set(userRef, {
      email: email,
      user_id: id,
      password: password
    });
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="#3D4AE7" />
        </TouchableOpacity>
       <Text style={styles.smasing}>SMASHING</Text>
      </View>
     
      {/* 헤더 */}
      <Text style={styles.join}>회원가입</Text>

      {/* 계정 */}
      <Text style={styles.title}>계정</Text>

     

      {/* 아이디 입력 */}
      <View style={styles.inputContainer}>
     
        <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="아이디 입력"
            value={id}
            onChangeText={(text) => setid(text)}
          />
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputContainer}>
       
        <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="비밀번호를 입력"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
      </View>

      {/* 비밀번호 확인 */}
      <View style={styles.inputContainer}>
       
        <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="비밀번호를 확인"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
      </View>

      {/* 이메일 입력 */}
      <View style={styles.inputContainer}>
      
        <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
      </View>

      {/* 다음으로 넘어가는 버튼 */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
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
  header: {
    top:"6%",
    height:50,
    marginLeft:"3%",
     // flexDirection: 'row',
     alignSelf: 'flex-start', // 이 부분을 추가하여 상단에 배치
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
  join: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: '5%',
   top:"12%"
  },
  title: {
    position: 'absolute',
    width: 34,
    height: 22,
    left: 20,
    top: '28%',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000',
  },
  group29: {
    position: 'absolute',
    width: 320,
    height: 26.02,
    left: 20,
    top: '25%',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    marginLeft: '5%',
    top: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#3D4AE7',
    marginVertical: 10,
  },
  inputLabel: {
    width: 120,
    height: 16,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#3E3E3E',
  },
  input: {
    flex: 1,
    height: 30,
    padding: 0,
  },
  nextButton: {
    marginTop: '50%',
    marginLeft: '5%',
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center', // 세로 중앙 정렬
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center', // 가로 중앙 정렬
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
  },

});

export default EmailSignUpComponent;
