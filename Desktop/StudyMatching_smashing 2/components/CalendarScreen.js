//CalendarScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, TextInput, BackHandler, Alert, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-color-picker';

import { firebaseConfig } from '../firebaseConfig';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const userUID = 'IT0OPavkJshdCO6JNhUw';

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firestore 인스턴스 가져오기
const firestore = firebase.firestore();
const auth = getAuth();

const Stack = createStackNavigator();

const CalendarHome = ({navigation}) => {
  const [schedules, setSchedules] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser) { // 처음 홈화면 입장 시
      getUsers();
    } 

    const unsubscribe = navigation.addListener('focus', () => {
      if (currentUser) {
        getUsers();
      } // focus를 얻을 때마다 데이터를 다시 불러옴
    });
  
    const getUID = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  
    // 컴포넌트가 언마운트될 때 감지 중지
    return () => {
      unsubscribe();
      getUID();
    };
  }, [navigation, currentUser]);

  const getUsers = async () => {
    try {
      if (!currentUser) {
        return; // currentUser가 null이면 데이터를 가져오지 않음
      }
      const usersCollection = await firestore.collection('/userData/' + currentUser.uid + '/calendar').orderBy('day', 'asc').get();
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

  const deleteSchedule = async (scheduleId) => {
    try {
      const scheduleRef = firestore.collection('/userData/' + currentUser.uid + '/calendar'); // 컬렉션 경로 수정
      await scheduleRef.doc(scheduleId).delete(); // 문서 경로 수정
      alert("삭제되었습니다!");
      getUsers(); // 데이터 다시 불러오는 함수 호출
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };
  
  const handleScheduleDelete = (scheduleId) => {
    Alert.alert("삭제", "정말 해당 일정을 삭제하시겠습니까?", [
      {
        text: "아니오",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "예",
        onPress: () => deleteSchedule(scheduleId),
      }
    ]);
  };

  const scheduleInfoBtn = (schedule) => {
    Alert.alert(schedule.year + '년 ' + schedule.month + '월 ' + schedule.day + '일', '제목 : ' + schedule.title + '\n' + '내용 : ' + schedule.detail+ '\n\n' + '해당 일정을 삭제하려면 아래의 \'삭제\' 버튼을 눌러주세요 ', [
      {
        text: "닫기",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "삭제",
        onPress: () => handleScheduleDelete(schedule.id),
      }
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers();
    });

    return unsubscribe;
  }, [navigation]);

  const generateMarkedDates = (schedules) => {
    const markedDates = {};
    Object.values(schedules).forEach(schedule => {
      const dateString = `${schedule.year}-${schedule.month < 10 ? '0' + schedule.month : schedule.month}-${schedule.day < 10 ? '0' + schedule.day : schedule.day}`;
      markedDates[dateString] = { marked: true, dotColor: schedule.calendarColor };
    });
    return markedDates;
  };
  

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={generateMarkedDates(schedules)}
        theme={{
          todayBackgroundColor: '#D8D8D8',
          arrowColor: '#009688',
          todayTextColor: 'white',
        }}
      />
      <View style={styles.scheduleContainerTitle}>
        <Text style={styles.scheduleContainerText}>
          ----- My Study Schedule -----
        </Text>
        <TouchableOpacity onPress={handleNewBtn} style={styles.newBtn}>
            <Text style={{fontSize: 15, fontWeight: '600',}}>+ 일정 추가</Text>
        </TouchableOpacity>
      </View>

      {schedules.length === 0 ? ( // todos 배열이 비어있는지 확인
      <View style={{...styles.scheduleListContainer, flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 18,}}>일정을 추가해 주세요</Text>
      </View>
    ) : (
      <ScrollView style={styles.scheduleListContainer} showsVerticalScrollIndicator={false}>
        {Object.keys(schedules).map((key) => (
          <View key={key} style={{...styles.scheduleList, backgroundColor: schedules[key].calendarColor,}}>
            <View style={{...styles.scheduleDate, backgroundColor: "#FFFAEE",}}>
              <Text style={{fontSize: windowWidth * 0.05, fontWeight: '600', color: schedules[key].calendarColor}}>
                {schedules[key].month + '-' + schedules[key].day}
              </Text>
            </View>
            <View style={styles.scheduleTitle}>
              <Text style={{fontSize: windowWidth * 0.042, fontWeight: '600'}}>
                {schedules[key].title}
              </Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Feather name="info" onPress={() => scheduleInfoBtn(schedules[key])} size={windowWidth * 0.08} color="#FFFAEE" />
            </View>
          </View>
        ))}
      </ScrollView>
    )}
    </View>
  );
}

const NewScheduleScreen = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [todos, setTodos] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black'); // 초기 색상 설정
  const [currentUser, setCurrentUser] = useState(null);
  
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSaveColor = () => {
    alert(selectedColor + " 색상을 저장하였습니다.")
    
  };

  const onChangeTextTitle = (payload) => setTitle(payload);
  const onChangeTextDetail = (payload) => setDetail(payload);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  useEffect(() => {
  
    const getUID = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  
    // 컴포넌트가 언마운트될 때 감지 중지
    return () => {
      getUID();
    };
  }, []);

  const addSchedule = async () => {
    if (!selectedDate || title === '' || detail === '') {
      alert('날짜, 제목, 세부사항을 모두 작성해주세요!');
      return;
    }

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    try {
      const todoRef = firestore.collection('/userData/' + currentUser.uid + '/calendar');
      const newTodo = {
        calendarColor: selectedColor,
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
      navigation.goBack();
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
      '일정 작성을 완료하시겠습니까?' +'\n' + '(+ 색상 저장을 누르셨나요? \n 기본 색상은 검은색 입니다.)',
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
        <FontAwesome5 name="calendar-plus" marginTop={5} size={windowWidth * 0.07} color="black" />
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
          <View style={{flex: 1, flexDirection: 'row', marginHorizontal: windowWidth * 0.05, marginTop: windowHeight * 0.03, alignItems: 'center'}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
              <TouchableOpacity style={{backgroundColor: 'white' , borderRadius: 15, paddingHorizontal: 12, paddingVertical: 10,}} onPress={showDatePicker}>
                <Text style={{fontWeight: '600'}}>{selectedDate ? selectedDate.toLocaleDateString() : '이곳을 눌러 날짜를 정하세요'}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <ColorPicker
              onColorSelected={handleColorChange}
              style={{ flex: 1 }}
              hideSliders={true} // 옵션: 슬라이더 숨기기
            />
            <View style={{flex: 1,}}>
              <Text style={{fontSize: 11, fontWeight: '600'}}>가운데 원을 클릭하여 색상을 선택 후 아래의 '색상 저장'을 눌러주세요</Text>
              <TouchableOpacity onPress={handleSaveColor} style={styles.saveColorBtn}>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>색상 저장</Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* {selectedDate && (
            <Text>선택한 날짜: {selectedDate.toLocaleDateString()}</Text>
          )} */}

          <TextInput 
          onChangeText={onChangeTextTitle} 
          value={title}
          placeholder={"제목(20자 이내 권장)"} 
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
  scheduleContainerTitle: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
    marginLeft: windowWidth * 0.09, 
    marginRight: windowWidth * 0.08, 
    alignItems: 'center'
  },
  // newBtn: {
  //   alignItems: 'center',
  //   width: 90,
  //   borderRadius: 10,
  //   paddingVertical: windowHeight * 0.012, 
  //   borderRadius: 12, 
  //   backgroundColor: '#CEF6CE',
  // },
  // scheduleContainer: {
  //   alignItems: 'center',
  //   paddingVertical: windowHeight * 0.01,
  //   marginHorizontal: windowWidth * 0.05,
  //   borderRadius: 10,
  // },
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
    marginVertical: windowHeight * 0.01,
    width: windowWidth * 0.5,
    backgroundColor: '#FFFAEE',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scheduleInfo: {
    marginHorizontal: windowWidth * -0.02, // 아이콘 배경이 커서 조절
    paddingVertical: windowHeight * 0.015,
    paddingRight: 12,
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
  saveColorBtn: {
    paddingVertical: 7,
    backgroundColor: '#007AFF', // 버튼의 배경색
    borderRadius: 10, // 버튼의 모서리 둥글기
    alignItems: 'center', // 버튼 내부 요소를 가운데 정렬
    justifyContent: 'center',
    marginTop: 8,
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
    flex: 3,
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