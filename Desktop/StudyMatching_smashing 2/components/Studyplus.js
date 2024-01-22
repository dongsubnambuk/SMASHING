// Studyplus.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


const Studyplus = () => {
  const [studygroupName, setStudygroupName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [studyPeriod, setStudyPeriod] = useState('');
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const categories = [
    { label: '인원수선택', value: '' },
    { label: '4명', value: '4명' },
    { label: '6명', value: '6명' },
    { label: '8명', value: '8명' },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setSelectedCategory(item.value);
        setCategoryModalVisible(false);
      }}
    >
      <Text style={styles.categoryItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const onDayPress = (day) => {
    setStudyPeriod(day.dateString);
    setCalendarVisible(false);
  };

const onCreateStudyPress = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'studies'), {
        studygroupName,
        selectedCategory,
        studyPeriod,
      });
  
      alert(`스터디 생성이 완료되었습니다. 스터디 ID: ${docRef.id}`);
    } catch (error) {
      console.error('스터디 생성 오류:', error);
      alert(`스터디 생성 중 오류가 발생했습니다.`);
    }
  };
  
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>SMASHING</Text>
        <Text style={styles.mystudygroup}>모임 만들기</Text>
        <Text style={styles.mystudygroup_under}>대충 있어 보이는 말</Text>
        <TextInput
          style={styles.textInput}
          placeholder="모임명"
          placeholderTextColor="#3D4AE7"
          onChangeText={(text) => setStudygroupName(text)}
          value={studygroupName}
        />
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryBoxText}>
            {selectedCategory ? `선택된 인원수: ${selectedCategory}` : '인원수선택'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.categoryBoxText}>
            {studyPeriod ? `학습 기간: ${studyPeriod}` : '학습 기간 선택'}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCategoryModalVisible}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.value}
              />
              <Button
                title="취소"
                onPress={() => setCategoryModalVisible(false)}
                color="#3D4AE7"
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={() => setCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{ [studyPeriod]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
              />
              <Button
                title="취소"
                onPress={() => setCalendarVisible(false)}
                color="#3D4AE7"
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.createStudyButton}
          onPress={onCreateStudyPress}
        >
          <Text style={styles.createStudyButtonText}>스터디 생성하기</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  title: {
    top: '7%',
    marginLeft: '5%',
    fontSize: 35,
    color: '#3D4AE7',
    fontWeight: 'bold',
  },
  mystudygroup: {
    top: '7.5%',
    marginLeft: '5%',
    fontSize: 28,
    fontWeight: 'bold',
  },
  mystudygroup_under: {
    top: '8%',
    marginLeft: '5%',
    fontSize: 20,
  },
  textInput: {
    top: '10%',
    margin: 15,
    height: 40,
    borderColor: '#3D4AE7',
    borderWidth: 1.5,
  },
  categoryBox: {
    top: '11%',
    margin: 15,
    padding: 10,
    borderColor: '#3D4AE7',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBoxText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  categoryItemText: {
    fontSize: 18,
    color: 'black',
  },
  createStudyButton: {
    top: '15%',
    margin: 15,
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createStudyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Studyplus;
