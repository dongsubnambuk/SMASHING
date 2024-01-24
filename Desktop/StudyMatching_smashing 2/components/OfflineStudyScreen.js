// OnlineStudyScreen.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where, // 추가
  } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


const OfflineStudyScreen = ({ navigation }) => {
  const [onlineStudyList, setOnlineStudyList] = useState([]);

  useEffect(() => {
    // Firebase Firestore에서 온라인 스터디 목록 가져오기
    const getOnlineStudyList = async () => {
      try {
        const q = query(collection(firestore, 'studies'), where('isOnline', '==', false));
        const querySnapshot = await getDocs(q);

        const studies = [];
        querySnapshot.forEach((doc) => {
          studies.push(doc.data());
        });
        setOnlineStudyList(studies);
      } catch (error) {
        console.error('온라인 스터디 목록 가져오기 오류:', error);
      }
    };

    getOnlineStudyList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#3D4AE7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>온라인 스터디 리스트</Text>
      </View>
      <ScrollView style={styles.studyContainer}>
        {onlineStudyList.map((study, index) => (
          <TouchableOpacity
            key={index}
            style={styles.studyItem}
            onPress={() => {
              // 개별 스터디를 선택했을 때의 동작 추가
              // navigation.navigate('StudyDetails', { study }); // 예시: 스터디 세부 정보 화면으로 이동
            }}
          >
            <View style={styles.studyContent}>
              <Text style={styles.studyTitle}>{study.studygroupName}</Text>
              <Text style={styles.studyDetail}>{study.selectedCategory}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  studyContainer: {
    top: "5%",
    width: '90%', // 90% 너비
    alignSelf: 'center', // 가운데 정렬
    marginTop: 10, // 위쪽 여백 조절
  },
  studyItem: {
    marginBottom: 10, // 각 스터디 간 간격 조절
    borderRadius: 15, // 둥근 테두리
    overflow: 'hidden', // 내부의 컨텐츠를 테두리 안으로 숨김
  },
  studyContent: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  studyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  studyDetail: {
    fontSize: 16,
    color: '#888',
  },
  header: {
    top: "12%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  backButton: {
    paddingRight: 10,
  },
});

export default OfflineStudyScreen;
