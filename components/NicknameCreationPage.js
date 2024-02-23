import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const NicknameCreationPage = ({ route }) => {
  const [nickname, setNickname] = useState('');
  const [nicknameLength, setNicknameLength] = useState(0);

  const navigation = useNavigation();

  const userId = route.params.userId;
  const email = route.params.email;
  const username = route.params.username;
  const password = route.params.password;

  const handleNext = () => {
    // Firebase에 데이터 저장
    saveUserDataToFirebase();

    // 다음 단계로 넘어가는 코드 추가
    navigation.navigate('SignUpCompletionPage');
  };

  const saveUserDataToFirebase = () => {
    const userRef = ref(database, 'users/' + userId);
    set(userRef, {
      email: email,
      user_id: id,
      password: password,
      nickname: nickname,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#3D4AE7" />
      </TouchableOpacity>
      <Text style={styles.header}>닉네임 만들기</Text>

      {/* 닉네임 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="닉네임 입력"
          value={nickname}
          onChangeText={(text) => {
            // 최대 10글자로 제한
            if (text.length <= 10) {
              setNickname(text);
              setNicknameLength(text.length);
            }
          }}
        />
        <Text style={styles.characterCount}>{nicknameLength}/10</Text>
      </View>

      {/* 다음으로 넘어가는 버튼 */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#3D4AE7',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 30,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  characterCount: {
    marginLeft: 10,
    fontSize: 12,
    color: '#888888',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
});

export default NicknameCreationPage;
