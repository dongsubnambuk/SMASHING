import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SerchId = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="#3D4AE7" />
        </TouchableOpacity>
      <Text style={styles.text}>
        아이디 찾기
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="휴대전화번호를 입력하세요('-'제외)"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.text1}>
            인증번호 전송
          </Text>
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
  text: {
    marginVertical: 5,
    textAlign: 'center',
    color: '#000000',
    fontWeight: '800',
    fontSize: 22,
    // lineHeight: 21,
    fontWeight: 'bold',
  },
  inputContainer: {
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
    top: '4%',
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
  rectangle284: {
    // styles for rectangle284
  },
  rectangle285: {
    // styles for rectangle285
  },
  backButton: {
    alignSelf: 'flex-start',
  },
});

export default SerchId;
