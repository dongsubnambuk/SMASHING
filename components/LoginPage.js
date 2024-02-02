import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={35} color="#3D4AE7" />
            </TouchableOpacity>
          <Text style={styles.smasing}>SMASHING</Text>
          <Text style={styles.login}>로그인</Text>
        </View>
        <View style = {styles.accountContainer}>
          <Text style={styles.account}>계정</Text>
          <View style={styles.emailInputContainer}>
            <TextInput
              style={{ color: '#000' }}
              placeholder="이메일을 입력하세요"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={{color: '#000' }}
              placeholder="비밀번호를 입력하세요"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.primary} onPress={handleLogin}>
          <Text style={styles.loginbtn}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.accountLink} onPress={navigateToFindAccount}>
            <Text style={styles.linkText}>계정 찾기</Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 20 }} />
          <TouchableOpacity style={styles.passwordLink} onPress={navigateToFindPassword}>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  header: {
    zIndex: 1,
    height: 'auto',
    width: '100%',
    paddingHorizontal: '3%',
    position: 'absolute',
    top: StatusBar.currentHeight, // StatusBar의 높이로 설정
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 흰색 배경에 50% 투명도
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
    textAlign: 'left',
    color: '#000000',
    fontWeight: '800',
    fontSize: 25,
    alignSelf: 'flex-start',
  },

  accountContainer: {
    marginTop: '10%',
    width: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  account: {
    textAlign: 'left',
    color: '#000000',
    fontSize: 22,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    paddingHorizontal: '3%',
  },
  
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3d4ae7',
    marginHorizontal: '5%',
  },
  orText: {
    height: 'auto',
    color: 'black',
    fontSize: 18,
  },
  emailInputContainer: {
    marginTop: '5%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginVertical: 15,
  },
  passwordInputContainer: {
    marginTop: '3%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3d4ae7',
    marginVertical: 15,
  },
  primary: {
    marginTop: '1%',
    height: 50,
    width: '92%',
    backgroundColor: '#3d4ae7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginbtn: {
    color: '#fcfcfc',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  linkContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    marginBottom: '-1%', // marginBottom 값을 조절하여 살짝 겹치도록 함
  },
  accountLink: {
    width: '48%', // 반반으로 차지하도록 수정
    alignItems: 'center',
    color: 'black',
    fontSize: 18,
  },
  passwordLink: {
    width: '48%', // 반반으로 차지하도록 수정
    alignItems: 'center',
    color: 'black',
    fontSize: 18,
  },  
  linkText: {
    color: 'black',
    fontSize: 18,
  },
  

  secondary: {
    width: '92%',
    height: 50,
    marginTop: '2%',
    backgroundColor: '#ffffff',
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
