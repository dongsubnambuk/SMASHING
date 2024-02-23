import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PasswordRecoveryScreen=()=> {
  const [email, setemail] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Passwordserchauth'); // Passwordserchauth 페이지로 이동
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
      <View style={styles.imageContainer}>
       
      </View>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 찾고자 하는 이메일 입력해주세요."
        value={email}
        onChangeText={text => setemail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  logo: {
    fontSize: 24,
    color: '#3d4ae7',
    fontFamily: 'Ultra',
    marginBottom: 20,
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

  input: {
    top:"20%",
    width: '80%',
    height: 40,
    borderWidth: 0, // 밑줄이므로 테두리 제거
    borderBottomWidth: 1, // 밑줄 추가
    borderBottomColor: '#3d4ae7', // 밑줄 색상
    paddingHorizontal: 10,
    marginBottom: 5, 
  },
  button: {
    height: 50,
    top: '20%',
    width: '84%',
    marginVertical: 20,
    backgroundColor: '#3d4ae7',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
});

export default PasswordRecoveryScreen;
