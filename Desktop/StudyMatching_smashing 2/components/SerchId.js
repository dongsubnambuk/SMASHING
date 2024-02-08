import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig'; 
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SerchId = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendEmail = async () => {
    try {
      // Firebase Auth SDK를 사용하여 이메일로 사용자에게 인증 이메일을 보냅니다.
      await auth.sendPasswordResetEmail(email);
      Alert.alert('이메일 전송 성공', '이메일로 인증번호를 보냈습니다.');
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      Alert.alert('이메일 전송 실패', '이메일 전송 중 오류가 발생했습니다.');
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
      
      <Text style={styles.text}>아이디 찾기</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button1} onPress={handleSendEmail}>
          <Text style={styles.text1}>이메일 전송</Text>
        </TouchableOpacity>
      </View>
      
      
      <View style={styles.separator} />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="인증번호를 입력하세요"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text2}>
            확인
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.primary}>
        <Text style={styles.title}>
          아이디 찾기
        </Text>
      </TouchableOpacity>
      
      <View style={styles.rectangle284} />
      <View style={styles.rectangle285} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    top:"6%",
    height:50,
    marginLeft:"3%",
     alignSelf: 'flex-start', // 이 부분을 추가하여 상단에 배치
   },
  smasing: {
  
    fontSize: 50,
    color: '#3D4AE7',
    fontFamily: 'Ultra',
    lineHeight: 54,
     alignItems: 'center',
     fontWeight: 'bold',
  },
  text: {
    top:"20%",
    marginVertical: 5,
    textAlign: 'center',
    color: '#000000',
    fontWeight: '800',
    fontSize: 22,
    // lineHeight: 21,
    fontWeight: 'bold',
  },
  inputContainer: {
    top:"45%",
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginVertical: 10,
  },
  inputText: {
    flex: 1,
    padding: 5,
    color: '#000',
  },
  separator: {
    height: 10,
  },
  button1: {

    width: '30%',
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    marginVertical: 5,
    textAlign: 'center',
    color: '#3d4ae7',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 21,
  },
  button2: {
    width: '30%',
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text2: {
    marginVertical: 5,
    textAlign: 'center',
    color: '#3d4ae7',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 21,
  },
  primary: {
    height: 50,
    top: '23%',
    width: '85%',
    marginVertical: 20,
    backgroundColor: '#3d4ae7',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fcfcfc',
    fontSize: 20,
    fontWeight: 'bold',
  },

  backButton: {
    alignSelf: 'flex-start',
  },
});

export default SerchId;
