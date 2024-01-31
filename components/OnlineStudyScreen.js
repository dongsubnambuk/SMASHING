// OnlineStudyScreen.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Image, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import * as Location from 'expo-location';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const OnlineStudyScreen = ({ navigation }) => {
  const [onlineStudyList, setOnlineStudyList] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isLocationGranted, setLocationGranted] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => {
    const getOnlineStudyList = async () => {
      try {
        const q = query(collection(firestore, 'studies'), where('isOnline', '==', true));
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

  const openModal = (study) => {
    setSelectedStudy(study);
    setLocationModalVisible(true);
  };

  const closeModal = () => {
    setSelectedStudy(null);
    setLocationModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#3D4AE7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>온라인 스터디 리스트</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.studyContainer}>
  {onlineStudyList.map((study, index) => (
    <TouchableOpacity
    key={index}
    style={styles.studyItem}
    onPress={() => openModal(study)} // 스터디를 눌렀을 때 모달 열기
  >
      <View style={styles.studyContentWrapper}>
      {study.thumbnail ? (
            <Image source={{ uri: study.thumbnail }} style={styles.studyThumbnail} />
          ) : (
            <View style={styles.noThumbnailContainer}>
              <Text style={styles.noThumbnailText}>썸네일 없음</Text>
            </View>
          )}
        
        <View style={styles.studyContent}>
          <Text style={styles.studyTitle}>{study.studygroupName}</Text>
          <View style={styles.studyInfo}>
            <Text style={styles.studyInfoText}>인원수: {study.selectedCategory || '없음'}</Text>
            <Text style={styles.studyInfoText}>기간: {study.studyPeriod !== undefined ? study.studyPeriod : '없음'}</Text>
          
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ))}
</ScrollView>
<Modal
        animationType="slide"
        transparent={true}
        visible={isLocationModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>스터디명:</Text>
              <Text style={styles.modalText}>{selectedStudy?.studygroupName}</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>인원수:</Text>
              <Text style={styles.modalText}>{selectedStudy?.selectedCategory || '없음'}</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>기간:</Text>
              <Text style={styles.modalText}>{selectedStudy?.studyPeriod !== undefined ? selectedStudy?.studyPeriod : '없음'}</Text>
            </View>

            {/* 버튼 컨테이너 */}
            <View style={styles.buttonContainer}>
              {/* 닫기 버튼 */}
              <TouchableOpacity style={[styles.closeButton, styles.applyButton]} onPress={closeModal}>
                <Text style={styles.applyButtonText}>닫기</Text>
              </TouchableOpacity>

              {/* 신청 버튼 - 여기에 스터디에 지원하는 논리를 추가할 수 있습니다 */}
              <TouchableOpacity style={styles.applyButton} onPress={() => {/* 여기에 지원하는 논리를 추가하세요 */}}>
                <Text style={styles.applyButtonText}>신청하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  studyContainer: {
    flexDirection: 'row', // 스터디 아이템을 수평으로 배치
    flexWrap: 'wrap', // 화면 크기에 맞게 자동으로 줄 바꿈
    justifyContent: 'space-between', // 스터디 아이템 사이의 간격을 최대화
    marginTop: 10,
    paddingHorizontal: 5,
     // 좌우 여백 추가
     paddingBottom: 50, 
  },
  studyItem: {
    width: '49%',
    aspectRatio: 1, // 정사각형 모양 유지
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
   
  },
  studyContentWrapper: {
    flexDirection: 'column', // 컨텐츠를 세로로 표시
    alignItems: 'center',
    
  },
  studyThumbnail: {
    width: '90%', // 스터디 아이템의 전체 너비 차지
    height: '60%', // 필요에 따라 높이 조절
    resizeMode: 'cover',
    borderRadius: 10,
  },
  studyContent: {
    width: '100%',
    padding: 10,
    marginTop: 3,
    backgroundColor: '#f7f7f7', // 배경색 추가
    borderRadius: 10,
    
  },

  studyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // 제목 색상 변경
  },

  studyInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 3,
    flexWrap: 'wrap', // 간격 추가
 
  },
  studyInfoText: {
    fontSize: 16,
    color: '#555', // 텍스트 색상 변경
   
  },
  header: {
    // top: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    // marginLeft: 10,
    fontWeight: 'bold',
  },
  backButton: {
    paddingRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  permissionMessage: {
    backgroundColor: '#3D4AE7',
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
  },
  permissionMessageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noThumbnailContainer: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ddd', // 배경색 추가
    borderRadius: 10,
  },
  noThumbnailText: {
    fontSize: 16,
    color: '#777', // 텍스트 색상 변경
  },

  modalInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  applyButton: {
    backgroundColor: '#3D4AE7',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  modalText: {
    fontSize: 18,
    // 추가된 스타일
  },
  applyButton: {
    backgroundColor: '#3D4AE7',
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // applyButton의 오른쪽 마진 추가
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#3D4AE7',
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // closeButton의 오른쪽 마진 추가
    alignItems: 'center',
  },
});

export default OnlineStudyScreen;

