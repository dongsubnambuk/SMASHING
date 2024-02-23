import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc, serverTimestamp,doc,updateDoc
} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

import { Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

const OnlineStudyScreen = ({ navigation }) => {
  const [OnlineStudyList, setOnlineStudyList] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isLocationGranted, setLocationGranted] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [isStudyModalVisible, setStudyModalVisible] = useState(false);
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [selectedStudyLocation, setSelectedStudyLocation] = useState(null);
  const [selectedStudyItem, setSelectedStudyItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getOnlineStudyList = async () => {
      try {
        const q = query(collection(firestore, 'studies'), where('isOnline', '==', true));
        const querySnapshot = await getDocs(q);
    
        const studies = [];
        for (const doc of querySnapshot.docs) {
          const studyData = doc.data();
    
          const locationId = studyData?.location?.id;
          if (locationId) {
            studies.push({
              ...studyData,
              currentParticipants: Number(studyData.currentParticipants) || 0,
              totalParticipants: Number(studyData.totalParticipants) || 0,
            });
          }
        }
    
        setOnlineStudyList(studies);
      } catch (error) {
        console.error('온라인 스터디 목록 가져오기 오류:', error);
      }
    };
    

    getOnlineStudyList(); // 함수 호출
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // 컴포넌트가 언마운트될 때 감지 중지
    return () => unsubscribe();
  }, []);



  const showStudyModal = (study) => {
  
    setSelectedStudy(study); // 주석 처리
    setStudyModalVisible(true);
  };

 
 


    const applyForStudy = async () => {
      try {
        if (!selectedStudy || !selectedStudy.studyId) {
          console.error('선택된 스터디가 유효하지 않습니다.');
          return;
        }
    
        const userDocRef = doc(firestore, 'applystudy', currentUser.uid);
    
        // 사용자가 이미 이 스터디에 신청했는지 확인
        const userAppliedStudiesQuery = query(
          collection(userDocRef, 'onlineStudies'),  // 온라인 스터디 컬렉션
          where('studyId', '==', selectedStudy.studyId)
        );
    
        const userAppliedStudiesSnapshot = await getDocs(userAppliedStudiesQuery);
    
        if (!userAppliedStudiesSnapshot.empty) {
          // 사용자가 이미 이 스터디에 신청했다면
          Alert.alert('중복 신청', '이미 신청한 스터디입니다.');
          return;
        }
    
        // 생성자와 현재 사용자 ID 비교하여 중복 확인
        if (selectedStudy.createdBy === currentUser.uid) {
          // 중복 신청 알림 또는 처리
          Alert.alert('중복 신청', '현재 사용자가 생성한 스터디입니다. 중복으로 신청할 수 없습니다.');
          return;
        }

        const currentParticipants = Number(selectedStudy.currentParticipants) || 0;
        const totalParticipants = Number(selectedStudy.totalParticipants) || 0;
    
        if (currentParticipants >= totalParticipants) {
          // 마감된 경우
          Alert.alert('마감', '이 스터디는 마감되었습니다.');
          return;
        }

        const updatedCurrentParticipants = Number(selectedStudy?.currentParticipants) + 1;

        if (selectedStudy) {
          const studyDocRef = doc(firestore, 'studies', selectedStudy.studyId);
        
          // 생성자가 정의되어 있지 않은 경우 기본값으로 설정
          const createdBy = selectedStudy.createdBy || "unknown";
        
          await updateDoc(studyDocRef, { currentParticipants: updatedCurrentParticipants });
        } else {
          console.error('selectedStudy가 null 또는 undefined입니다.');
        }
    
        // Firestore의 "offlineStudies" 컬렉션에 새로운 문서를 추가합니다.
        const onlineStudiesCollection = collection(userDocRef, 'onlineStudies');
        const newDocRef = await addDoc(onlineStudiesCollection, {
          studyId: selectedStudy.studyId,  // studyId 추가
          ...selectedStudy,
          appliedAt: serverTimestamp(),
          // createdBy: createdBy, // 생성자 추가
        });
    
        // 성공 팝업
        Alert.alert('스터디 신청 성공', '스터디 신청이 성공적으로 완료되었습니다.');
       
        // 스터디 모달을 닫습니다.
        setStudyModalVisible(false);
      } catch (error) {
        console.error('스터디 신청 오류:', error);
        // 오류 처리
      }
    };
    
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="#3D4AE7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>온라인 스터디 리스트</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.studyContainer}
        style={{ flexGrow: 1 }}
      >
        {OnlineStudyList.map((study, index) => (
          <TouchableOpacity
            key={index}
            style={styles.studyItem}
            onPress={() => showStudyModal(study)} 
          >
            <View style={styles.studyContentWrapper}>
              {study.thumbnail ? (
                <Image
                  source={{ uri: study.thumbnail }}
                  style={styles.studyThumbnail}
                />
              ) : (
                <View style={styles.noThumbnailContainer}>
                  <Text style={styles.noThumbnailText}>썸네일 없음</Text>
                </View>
              )}
              <View style={styles.studyContent}>
                <Text style={styles.studyTitle}>{study.studygroupName}</Text>
                <View style={styles.studyInfo}>
                  <Text style={styles.studyInfoText}>
                  인원수: {study.currentParticipants}/{study.totalParticipants}
                  </Text>
                  <Text style={styles.studyInfoText}>
                    기간: {study.studyPeriod !== undefined ? study.studyPeriod : '없음'}
                  </Text>
                  <Text style={styles.studyInfoText}>
                    장소: 온라인 플렛폼
                  </Text>
                 
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
  animationType="slide"
  transparent={true}
  visible={isStudyModalVisible}
  onRequestClose={() => setStudyModalVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>스터디 정보</Text>
      {selectedStudy ? (
        <View>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>스터디명:</Text>
            <Text style={styles.modalText}>{selectedStudy.studygroupName}</Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>인원수:</Text>
            <Text style={styles.modalText}>
              {selectedStudy.totalParticipants || '없음'}
            </Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>기간:</Text>
            <Text style={styles.modalText}>
              {selectedStudy.studyPeriod !== undefined
                ? selectedStudy.studyPeriod
                : '없음'}
            </Text>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>스터디 장소: 온라인 플렛폼</Text>
        
          </View>
       
          <View style={styles.studyIntroduceSeparator}></View>
          <Text style={styles.applymodalLabel}>
            <Text style={styles.introducestudyBackground}>스터디 소개</Text>
          </Text>
          <Text style={styles.introducestudytext}>
            {selectedStudy.studyIntroduce || '없음'}
          </Text>
          <View style={styles.applybuttonContainer}>
          <TouchableOpacity
            style={[styles.applyButton1, styles.applyNowButton]}
            onPress={applyForStudy} 
          >
            <Text style={styles.applyButtonText}>신청하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.applyButton2, styles.closeButton]}
            onPress={() => setStudyModalVisible(false)}
          >
            <Text style={styles.applyButtonText}>닫기</Text>
          </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.modalText}>선택된 스터디가 없습니다.</Text>
      )}
    
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
    aspectRatio: 0.7, // 정사각형 모양 유지
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
  modalTitle: {
    fontSize: 28, // 글자 크기 늘림
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 18, // 글자 크기 늘림
  },
  applyButton: {
    backgroundColor: '#3D4AE7', // 신청하기 버튼 배경색
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff', // 신청하기 버튼 글자색
    fontSize: 18, // 신청하기 버튼 글자 크기
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  closeButton: {
    marginLeft: 15, // 왼쪽 마진 추가
  },
  mapModalView: {
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

  map: {
    flex: 1,
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  mapContainer: {
    flex: 1,
    
    borderRadius: 10,
  
  },
  noLocationText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  applyButton1:{
    width:"40%",
   
    backgroundColor: '#3D4AE7', // 신청하기 버튼 배경색
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButton2:{
    width:"40%",
    // top:"10%",
    backgroundColor: '#3D4AE7', // 취소하기 버튼 배경색
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applybuttonContainer: {
    top:"55%",
    flexDirection: 'row', // 수평으로 나란히 배치
    justifyContent: 'space-between', // 간격 최대화
 
  },
  studyIntroduceSeparator: {
    top:"3%",
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  introducestudyBackground: {
   
    // paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f2f2f2', // 회색 배경색 추가
  },
  applymodalLabel:{
    top:"5%",
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  
  
  introducestudytext: {
   
    height: '40%',
    top: '8%',
    fontSize: 15,
    color: 'black',

  },

});

export default OnlineStudyScreen;