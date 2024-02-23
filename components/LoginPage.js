import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const { width, height } = Dimensions.get('window');

const LoginPage = () => {
  const [userId, setUserId] = useState(''); // user_id 입력을 위한 상태 추가
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

 
  const handleLogin = async () => {
    try {
      // 수정된 부분: signInWithEmailAndPassword 함수에 user_id와 비밀번호를 전달합니다.
      await signInWithEmailAndPassword(auth, userId, password);
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
  };

  const navigateToFindAccount = () => {
    if (navigation) {
      navigation.navigate('SerchId');
    }
  };

  const navigateToFindPassword = () => {
    if (navigation) {
      navigation.navigate('Passwordserchauth');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="#3D4AE7" />
        </TouchableOpacity>
       <Text style={styles.smasing}>SMASHING</Text>
      </View>
     
        
      
        <Text style={styles.login}>로그인</Text>
       
        {/* 수정된 부분: user_id 입력 필드 */}
        <Text style={styles.account}>아이디</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="아이디를 입력하세요"
            value={userId}
            onChangeText={(text) => setUserId(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.primary} onPress={handleLogin}>
          <Text style={styles.loginbtn}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.link} onPress={navigateToFindAccount}>
            <Text style={styles.linkText}>계정 찾기</Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 20 }} />
          <TouchableOpacity style={styles.link} onPress={navigateToFindPassword}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>또는</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity style={styles.secondary}>
          <Text style={styles.googlelongin}>구글로 로그인하기</Text>
        </TouchableOpacity>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  inner:{
    top:"10%"
  },
  
  login: {
  
    fontWeight: 'bold',
    top: '10%',
    marginLeft: 10,
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  account: {
    top: '17%',
    marginLeft: 10,
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 22,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  orContainer: {
    top:"31%",
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20, // 양 옆 여백 조절
  },
  
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3d4ae7',
    marginHorizontal: 10, // 선의 양 옆 여백 조절
  },
  orText: {
    color: 'black',
    fontSize: 18,
  },
  inputContainer: {
    top: '35%',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginVertical: 15,
  },
  primary: {
    height: 50,
    top: '16%',
    width: '95%',
    marginVertical: 20,
    backgroundColor: '#3d4ae7',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbtn: {
    color: '#fcfcfc',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
   marginLeft:"5%",
    top: '32%',
    marginVertical: 10,
   
  },
  linkText: {
   
    paddingHorizontal: 20,
    justifyContent: 'space-between', // 또는 'space-evenly'
    // marginHorizontal: 20, 
    color: 'black',
    fontSize: 18,
  },
  secondary: {
    width: '95%',
    height: 50,
    top: '15%',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlelongin: {
    color: '#3d4ae7',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
});

export default LoginPage;
