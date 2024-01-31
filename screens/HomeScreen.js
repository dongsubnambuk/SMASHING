import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, BackHandler, Alert, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import { collection, getFirestore } from 'firebase/compat/firestore';
import { firebaseConfig } from '../firebaseConfig';
import firebase, { initializeApp } from 'firebase/compat/app';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
const firestore = firebase.firestore();

const getUsers = async () => {
  try {
    const usersCollection = await firestore.collection('todolist').get();
    const usersData = usersCollection.docs.map(doc => doc.data());
    console.log(usersData);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const Stack = createStackNavigator();

const MainScreen = ({navigation}) => {
  getUsers();


  const [todos, setTodos] = useState({});

  const handleNewBtn = () => {
    navigation.navigate('NewTodoScreen');
  };

  const handleButtonOnline = () => {
    navigation.navigate('MapScreen'); // 임시로 MypageScreen으로 이동
  };

  const handleButtonOffline = () => {
    // 버튼이 눌렸을 때 수행할 동작 추가
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Text style={{ fontSize: windowWidth * 0.055, fontWeight: '800' }}>
          스터디 찾기
        </Text>
        <Text style={{ fontSize: windowWidth * 0.04, fontWeight: '500' }}>
          대충 있어보이는 말
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} resizeMode="contain" name="search" size={windowHeight * 0.04} color="#3D4AE7" />
        <TextInput
          placeholder={"게시물 찾기"}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.onOffTitle}>온라인 / 오프라인 스터디 리스트</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonOnline} style={styles.button}>
          <Text style={styles.buttonText}>온라인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleButtonOffline} style={styles.button}>
          <Text style={styles.buttonText}>오프라인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todoAreaHeader}>
        <Text style={styles.todoAreaTitle}>To Do List</Text>
        <TouchableOpacity onPress={handleNewBtn} style={styles.newBtn}>
          <Text style={styles.todoAreaPlus}>+ 할 일 추가</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.toDoArea}>
        {/*
        <ScrollView style={styles.toDoListContainer} showsVerticalScrollIndicator={false}>
          {[...Array(10)].map((_, index) => (
            <View key={index} style={styles.toDoList}>
              <Text style={styles.toDoTitle}>목표</Text>
              <Text style={styles.toDoDetail}>세부 목표</Text>
            </View>
          ))}
        </ScrollView>
        */}
        <ScrollView style={styles.toDoListContainer} showsVerticalScrollIndicator={false}>
        {Object.keys(todos).map((key) => (
          <View key={key} style={styles.toDoList}>
            <Text style={styles.toDoTitle}>{todos[key].textTitle}</Text>
            <Text style={styles.toDoDetail}>{todos[key].textDetail}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
    </View>
  );
};

const NewTodoScreen = ({navigation}) => {
  const [textTitle, setTextTitle] = useState("");
  const [textDetail, setTextDetail] = useState("");
  const [todos, setTodos] = useState({});

  const onChangeTextTitle = (payload) => setTextTitle(payload);
  const onChangeTextDetail = (payload) => setTextDetail(payload);
  const addTodo = () => {
    if(textTitle === "" || textDetail === ""){
      alert("제목과 세부사항을 모두 작성해주세요!");
      return;
    }
    const newTodos = {
      ...todos, 
      [Date.now()]: { textTitle, textDetail },
    };
    setTodos(newTodos);
    alert("저장되었습니다!");
    //setTextTitle("");
    navigation.goBack();
  };
  console.log(todos);
  useEffect(() => { // 스마트폰의 뒤로가기를 눌렀을 때(작성 중 내용 증발 방지)
    const backAction = () => {
      Alert.alert("작성 그만두기", "일정 작성을 취소하고, 정말로 뒤로가시겠습니까?", [
        {
          text: "아니오",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "예",
          onPress: () => navigation.goBack()
        }
      ]);
      return true; // 기존 뒤로가기 동작을 막습니다.
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거

  }, [navigation]);

  const handleBackButton = () => { // X 버튼을 눌렀을 때
    Alert.alert(
      '작성 그만두기',
      '일정 작성을 취소하고, 정말로 뒤로가시겠습니까?',
      [
        {
          text: "아니오",
          onPress: () => null
        },
        {
          text: "예",
          onPress: () => navigation.goBack()
        }
      ],
    );
  };

  const handlecompleteButton = () => { // 체크 버튼을 눌렀을 때
    Alert.alert(
      '작성 완료하기',
      '일정 작성을 완료하시겠습니까?',
      [
        {
          text: "아니오",
          onPress: () => null,
        },
        {
          text: "예",
          onPress: () => addTodo(), 
        }
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inHeader}>
        <FontAwesome6 name="calendar-plus" marginTop={5} size={windowWidth * 0.07} color="black" />
        <Text style={{fontSize: windowWidth * 0.07, fontWeight: '600'}}>
          할 일 추가
        </Text>
        <TouchableOpacity style={styles.completeBtn} onPress={handlecompleteButton}>
          <AntDesign name="check" size={windowWidth * 0.055} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={handleBackButton}>
          <AntDesign name="close" size={windowWidth * 0.055} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 10,}}>
        <View style={styles.inputArea}>
          <TextInput 
          onChangeText={onChangeTextTitle} 
          value={textTitle}
          placeholder={"제목"} 
          style={styles.inputTitle}/>
          <TextInput 
          onChangeText={onChangeTextDetail} 
          value={textDetail}
          placeholder={"세부사항"} 
          style={styles.inputDetail} 
          multiline ={true}/>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <Stack.Navigator //options={{ headerShown: false }} // 기본 헤더 숨기기
    screenOptions={{
    headerMode: 'none', // 상단의 뒤로가기 버튼 및 헤더 삭제
    }}initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="NewTodoScreen" component={NewTodoScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subHeader: {
    paddingVertical: windowHeight * 0.005,
    paddingHorizontal: windowWidth * 0.05,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.05,
    height: windowHeight * 0.05,
  },
  searchIcon: {
    padding: windowHeight * 0.005,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    color: '#424242',
  },
  onOffTitle: {
    fontSize: windowWidth * 0.035,
    color: '#3D4AE7',
    fontWeight: '600',
    marginLeft: windowWidth * 0.06,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.045,
  },
  button: {
    flex: 1,
    paddingVertical: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.004,
    backgroundColor: "#3D4AE7",
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.05,
    fontWeight: '700',
  },
  todoAreaHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.06,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.008,
  },
  todoAreaTitle: {
    fontSize: windowWidth * 0.05,
    color: '#3D4AE7',
    fontWeight: '700',
  },
  todoAreaPlus: {
    fontSize: 15, 
    fontWeight: '600',
  },
  toDoArea: {
    flex: 1,
    backgroundColor: '#E6E0F8',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: 20,
  },
  toDoListContainer: {
    borderRadius: 20,
  },
  toDoList: {
    paddingVertical: windowHeight * 0.012,
    paddingHorizontal: windowWidth * 0.04,
    marginBottom: windowHeight * 0.015,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  toDoTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
  },
  toDoDetail: {
    fontSize: windowWidth * 0.031,
  },
  //------------아래는 NewTodoScreen의 스타일
  inHeader: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.11,
  },
  completeBtn: {
    marginLeft: windowWidth * 0.15,
    paddingHorizontal: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.01,
    backgroundColor: '#E0F8E0',
    borderRadius: 10,
    elevation: 10,
  },
  backBtn: {
    paddingHorizontal: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.01,
    backgroundColor: '#F8E0E0',
    borderRadius: 10,
    elevation: 10,
  },
  inputArea: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: windowWidth * 0.07,
    marginBottom: windowHeight * 0.05,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    elevation: 10,
  },
  inputTitle: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: windowHeight * 0.03,
    marginHorizontal: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10,
    fontSize: windowHeight * 0.025,
    fontWeight: '600',
  },
  inputDetail: {
    flex: 5,
    backgroundColor: 'white',
    marginVertical: windowHeight * 0.03,
    marginHorizontal: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10,
    fontSize: windowHeight * 0.02,
    fontWeight: '500',
  },
});

export default HomeScreen;
