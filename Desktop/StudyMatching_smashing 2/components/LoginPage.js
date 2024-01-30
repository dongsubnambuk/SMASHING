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
  const [email, setEmail] = useState('');
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
      await signInWithEmailAndPassword(auth, email, password);
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
    console.log('이동: FindPasswordPage');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // 로그인 성공 시 BottomTabNavigationApp으로 이동
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigation.navigate('BottomTabNavigationApp');
  //   }
  // }, [isLoggedIn, navigation]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#3D4AE7" />
        </TouchableOpacity>
        <View style={styles.smashingHeader}></View>
        <Text style={styles.login}>로그인</Text>
        <Text style={styles.account}>계정</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, padding: 5, color: '#000' }}
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
        <Text style={styles.or}>또는</Text>
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
  smashingHeader: {
    // top: '3%',
    backgroundColor: '#ffffff',
    borderBottomColor: '#ccc',
    padding: 10,
    width: '100%',
  },
  smashingText: {
    color: '#3d4ae7',
    fontSize: 35,
    fontWeight: 'bold',
  },
  login: {
    fontWeight: 'bold',
    // top: '5%',
    marginLeft: 10,
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  account: {
    top: '13%',
    marginLeft: 10,
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 22,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  or: {
    top: '13%',
    marginLeft: 10,
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 18,
  },
  inputContainer: {
    top: '26%',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginVertical: 15,
  },
  primary: {
    height: 50,
    top: '11%',
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
    justifyContent: 'space-between',
    top: '25%',
    marginVertical: 10,
  },
  linkText: {
    color: '#3d4ae7',
    fontSize: 18,
  },
  secondary: {
    width: '95%',
    height: 50,
    top: '16%',
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
