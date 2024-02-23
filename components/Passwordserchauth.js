import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Auth 및 데이터베이스 인스턴스 가져오기
const auth = getAuth(app);
const db = getDatabase(app);

const Passwordserchauth = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // 이메일로 비밀번호 재설정 이메일 보내기
  const handleSendVerificationCode = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        '이메일 전송 완료',
        '링크를 접속하여 비밀번호를 변경해주세요.',
        [{ text: '확인' }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error sending email verification code:', error);
      Alert.alert('이메일 인증번호 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 로그인 후 비밀번호 업데이트
  const handleSignInAndUpdatePassword = async () => {
    try {
      // 이메일 주소로 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, newPassword);
      const user = userCredential.user;

      // 데이터베이스에 사용자 정보 업데이트
      await updateUserDatabase(user.uid, newPassword);

      // 비밀번호 변경 완료 메시지 표시
      Alert.alert(
        '비밀번호 변경 완료',
        '새로운 비밀번호로 로그인해주세요.',
        [{ text: '확인' }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('비밀번호 변경 실패', '비밀번호를 변경하는 데 문제가 발생했습니다. 다시 시도해주세요.', [{ text: '확인' }]);
    }
  };

  // 데이터베이스에 사용자 정보 업데이트하는 함수
  const updateUserDatabase = async (uid, newPassword) => {
    try {
      const userRef = ref(db, `users/${uid}`);
      await update(userRef, {
        password: newPassword
      });
      console.log('Updating user password in the database');
    } catch (error) {
      console.error('Error updating user password in the database:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="#3D4AE7" />
        </TouchableOpacity>
        <Text style={styles.smasing}>SMASHING</Text>
      </View>
   
      <Text style={styles.title}>비밀번호 찾기</Text>
      
      <TextInput
        style={styles.input1}
        placeholder="이메일주소 입력"
        value={email}
        onChangeText={setEmail}
      />
     
      <TouchableOpacity style={styles.button1} onPress={handleSendVerificationCode}>
        <Text style={styles.buttonText1}>이메일 전송</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input2}
        placeholder="변경한 비밀번호 입력"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      
      <TouchableOpacity style={styles.button}  onPress={handleSignInAndUpdatePassword}>
        <Text style={styles.buttonText}>비밀변호 변경 완료</Text>
      </TouchableOpacity>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    top:"6%",
    height:50,
    marginLeft:"3%",
    alignSelf: 'flex-start',
  },
  smasing: {
    fontSize: 50,
    color: '#3D4AE7',
    fontFamily: 'Ultra',
    lineHeight: 54,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    top: '10%',
    marginLeft: 10,
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  input1: {
    top:"20%",
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginBottom: 20,
  },
  input2: {
    top:"18%",
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginBottom: 20,
  },
  button1: {
    top:"13%",
    width: '30%',
    marginLeft:"48%",
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2:{
    top:"9.5%",
    width: '30%',
    marginLeft:"48%",
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 21,
  },

  button:{
    height: 50,
    top: '17%',
    width: '85%',
    marginVertical: 20,
    backgroundColor: '#3d4ae7',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1:{
    color: '#3d4ae7',
    fontSize: 16,
   
  },
  verificationStatus: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
  },
});

export default Passwordserchauth;