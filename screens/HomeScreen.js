import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts } from 'react-native-elements/dist/config';

const HomeScreen = () => {
  const navigation = useNavigation(); // useNavigation 훅 사용

  const handleButtonOnline = () => {
    navigation.navigate('MypageScreen'); // MypageScreen으로 이동
  };
  const handleButtonOffline = () => {
    // 버튼이 눌렸을 때 수행할 동작 추가
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Text style={{ fontSize: 23, fontWeight: '800' }}>
          스터디 찾기
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          대충 있어보이는 말
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={30} color="#3D4AE7" />
        <TextInput
          placeholder={"게시물 찾기"}
          style={styles.input}
        />
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10,}}>
        <Text style={{fontSize: 15, color: 'blue', fontWeight: '700'}}>
          온라인 / 오프라인 스터리 리스트
        </Text>
      </View>
      <View style={{flexDirection: "row", margin: 5,}}>
        <TouchableOpacity onPress={handleButtonOnline} style={{...styles.button, marginLeft: 10, marginRight: 2}}>
            <Text style={styles.buttonText}>온라인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonOffline} style={{...styles.button, marginRight: 10, marginLeft: 2}}>
            <Text style={styles.buttonText}>오프라인</Text>
          </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20,}}>
        <Text style={{fontSize: 20, color: 'blue', fontWeight: '700'}}>
          To Do List
        </Text>
      </View>
      <ScrollView style={styles.ToDoArea}>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  subHeader: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 25,
    fontSize: 80,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    marginVertical: 20,
    height: 45,
    margin: 10,
  },
  searchIcon: {
    flex: 1,
    padding: 5,
  },
  input: {
    flex: 9,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    color: '#424242',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#3D4AE7",
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  },
  ToDoArea: {
    height: "53%",
    backgroundColor: '#E6E0F8',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
  },
  ToDoList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  ToDoTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  ToDoDetail: {
    fontSize: 13,
  }
});

export default HomeScreen;
