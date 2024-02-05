//CalendarScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, TextInput, BackHandler, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Entypo, FontAwesome6, AntDesign } from '@expo/vector-icons';

import { firebaseConfig, userUID } from '../firebaseConfig';
import firebase, { initializeApp } from 'firebase/compat/app';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firestore 인스턴스 가져오기
const firestore = firebase.firestore();

const Stack = createStackNavigator();

const CalendarHome = ({navigation}) => {
  const [schedules, setSchedules] = useState({});

  const getUsers = async () => {
    try {
      const usersCollection = await firestore.collection('/userData/' + userUID + '/calendar').orderBy('day', 'asc').get();
      // createdAt 필드를 기준으로 정렬 -> 오름차순(desc), 내림차순(asc)
      const usersData = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNewBtn = () => {
    navigation.navigate('NewScheduleScreen');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers(); // MainScreen이 focus를 얻을 때마다 데이터를 다시 불러옴
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        //markedDates={markedSelectedDates}
        theme={{
          selectedDayBackgroundColor: '#009688',
          arrowColor: '#009688',
          dotColor: 'red',
          todayTextColor: '#009688',
        }}
        // onDayPress={(day) => {
        //   setSelectedDate(new Date(day.dateString));
        // }}
      />
      <View style={{alignItems: 'flex-end', marginRight: windowWidth * 0.05}}>
        <TouchableOpacity onPress={handleNewBtn} style={styles.newBtn}>
            <Text style={{fontSize: 15, fontWeight: '600',}}>+ 일정 추가</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleContainerText}>
          ----- My Study Schedule -----
        </Text>
      </View>

      <ScrollView style={styles.scheduleListContainer} showsVerticalScrollIndicator={false}>
        {Object.keys(schedules).map((key) => (
          <View key={key} style={{...styles.scheduleList, backgroundColor: schedules[key].color,}}>
            <View style={{...styles.scheduleDate, backgroundColor: "#FFFAEE",}}>
              <Text style={{fontSize: windowWidth * 0.05, fontWeight: '600', color: schedules[key].color}}>
                {schedules[key].month + '-' + schedules[key].day}
              </Text>
            </View>
            <View style={styles.scheduleTitle}>
              <Text style={{fontSize: windowWidth * 0.042, fontWeight: '600'}}>
                {schedules[key].title}
              </Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Entypo name="triangle-right" size={windowWidth * 0.145} color="#FFFAEE" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const NewScheduleScreen = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [todos, setTodos] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onChangeTextTitle = (payload) => setTitle(payload);
  const onChangeTextDetail = (payload) => setDetail(payload);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    console.log(date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const addSchedule = async () => {
    if (title === "" || detail === "") {
      alert("제목과 세부사항을 모두 작성해주세요!");
      return;
    }

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    try {
      const todoRef = firestore.collection('/userData/' + userUID + '/calendar');
      const newTodo = {
        selectedDate,
        year,
        month,
        day,
        title,
        detail,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await todoRef.add(newTodo);
      alert("저장되었습니다!");
      // navigation.goBack() 대신 navigation.navigate로 이동하면서 데이터 전달
      navigation.navigate('CalendarScreen', { refresh: true });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

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
          onPress: () => addSchedule(), 
        }
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inHeader}>
        <FontAwesome6 name="calendar-plus" marginTop={5} size={windowWidth * 0.07} color="black" />
        <Text style={{fontSize: windowWidth * 0.07, fontWeight: '600'}}>
          일정 추가
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
          <View style={{ flex: 1, marginTop: windowHeight * 0.03, justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity style={{backgroundColor: 'white' , borderRadius: 15, paddingHorizontal: 15,}} onPress={showDatePicker}>
              <Text style={{fontWeight: '600'}}>{selectedDate ? selectedDate.toLocaleDateString() : '이곳을 눌러 날짜와 시간을 정하세요'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          {/* {selectedDate && (
            <Text>선택한 날짜: {selectedDate.toLocaleDateString()}</Text>
          )} */}

          <TextInput 
          onChangeText={onChangeTextTitle} 
          value={title}
          placeholder={"제목"} 
          style={styles.inputTitle}/>
          <TextInput 
          onChangeText={onChangeTextDetail} 
          value={detail}
          placeholder={"세부사항"} 
          style={styles.inputDetail} 
          multiline ={true}/>
        </View>
      </View>
    </View>
  );
};

const CalendarScreen = () => {
  return (
    <Stack.Navigator //options={{ headerShown: false }} // 기본 헤더 숨기기
    screenOptions={{
    headerMode: 'none', // 상단의 뒤로가기 버튼 및 헤더 삭제
    }} initialRouteName="CalendarHome">
      <Stack.Screen name="CalendarHome" component={CalendarHome} />
      <Stack.Screen name="NewScheduleScreen" component={NewScheduleScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.015,
    width: windowWidth * 0.9,
    paddingVertical: windowHeight * 0.012,
    borderRadius: 15,
    elevation: 10, // 그림자
  },
  newBtn: {
    width: 100,
    borderRadius: 10,
    paddingVertical: windowHeight * 0.012, 
    paddingHorizontal: windowWidth * 0.03, 
    borderRadius: 12, 
    backgroundColor: '#CEF6CE',
  },
  scheduleContainer: {
    alignItems: 'center',
    paddingVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.05,
    borderRadius: 10,
  },
  scheduleContainerText: {
    color: '#3D4AE7',
    fontSize: 17,
    fontWeight: '600',
  },
  scheduleListContainer: {
    backgroundColor: '#E6E0F8',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: 20,
  },
  scheduleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.02,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleDate: {
    paddingVertical: windowHeight * 0.01,
    width: windowWidth * 0.15,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleTitle: {
    paddingVertical: windowHeight * 0.012,
    width: windowWidth * 0.5,
    backgroundColor: '#FFFAEE',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scheduleInfo: {
    marginHorizontal: windowWidth * -0.035, // 아이콘 배경이 커서 조절
  },
  //------------아래는 NewTodoScreen의 스타일
  inHeader: {
    flex: 1.3,
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
    flex: 5,
    backgroundColor: 'white',
    marginTop: windowHeight * 0.03,
    marginHorizontal: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10,
    fontSize: windowHeight * 0.025,
    fontWeight: '600',
  },
  inputDetail: {
    flex: 15,
    backgroundColor: 'white',
    marginVertical: windowHeight * 0.03,
    marginHorizontal: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10,
    fontSize: windowHeight * 0.02,
    fontWeight: '500',
  },
});

export default CalendarScreen;