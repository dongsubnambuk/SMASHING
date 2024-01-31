// NewScheduleScreen.js
/*
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, BackHandler, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigationApp from '../components/BottomTabNavigationApp';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewScheduleScreen = () => {
  const navigation = useNavigation();

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
          onPress: () => null,
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
          <TextInput placeholder={"제목"} style={styles.inputTitle}/>
          <TextInput placeholder={"세부사항"} style={styles.inputDetail} multiline ={true}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default NewScheduleScreen;
*/