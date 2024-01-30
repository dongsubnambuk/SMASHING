// OnlineStudyScreen.js
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
  addDoc, serverTimestamp
} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const OfflineStudyScreen = ({ navigation }) => {
  const [offlineStudyList, setOfflineStudyList] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isLocationGranted, setLocationGranted] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [isStudyModalVisible, setStudyModalVisible] = useState(false);
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [selectedStudyLocation, setSelectedStudyLocation] = useState(null);
  const [selectedStudyItem, setSelectedStudyItem] = useState(null);

  useEffect(() => {
    const getOfflineStudyList = async () => {
      try {
        const q = query(collection(firestore, 'studies'), where('isOnline', '==', false));
        const querySnapshot = await getDocs(q);

        const studies = [];
        for (const doc of querySnapshot.docs) {
          const studyData = doc.data();

          // study의 locationId를 사용하여 studies 컬렉션에서 위치 정보 가져오기
          const locationId = studyData?.location?.id;
          if (locationId) {
            // 여기서는 location 정보를 추가하지 않습니다.
            studies.push(studyData);
          }
        }

        setOfflineStudyList(studies);
      } catch (error) {
        console.error('오프라인 스터디 목록 가져오기 오류:', error);
      }
    };

    getOfflineStudyList(); // 함수 호출
  }, []);

  // 위치 권한 요청 함수
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } else {
        setLocationGranted(false);
      }
    } catch (error) {
      console.error('위치 권한 요청 오류:', error);
    }
  };

  const showStudyModal = (study) => {
    setSelectedStudy(study); // setSelectedStudy 사용
    setSelectedStudyLocation(study.location);
    setStudyModalVisible(true);
  };
  // 지도 모달을 열 때 호출되는 함수
 
 
  
  const openMap = () => {
    const studyLocation = selectedStudy?.location;
    if (studyLocation?.latitude && studyLocation?.longitude) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${studyLocation.latitude},${studyLocation.longitude}`;
      Linking.openURL(mapUrl);
    } else {
      console.error('지도를 열 수 없습니다. 위치 정보가 없습니다.');
    }
  };

  const applyForStudy = async () => {
    try {
      console.log('Selected Study:', selectedStudy);

      if (!selectedStudy || !selectedStudy.id) {
        console.error('선택된 스터디가 유효하지 않습니다.');
        return;
      }
  
      // Firestore의 "offlineStudies" 컬렉션에 새로운 문서를 추가합니다.
      const offlineStudiesCollection = collection(firestore, 'offlineStudies');
      await addDoc(offlineStudiesCollection, {
        studyId: selectedStudy.id,
        userId: '사용자의 고유 ID', // 실제 사용자의 고유 ID로 대체해야 합니다.
        appliedAt: serverTimestamp(),
      });
  
      // TODO: 신청이 성공했을 때 사용자에게 알림을 추가할 수 있습니다.
  
      // 스터디 모달을 닫습니다.
      setStudyModalVisible(false);
    } catch (error) {
      console.error('스터디 신청 오류:', error);
      // TODO: 오류 발생 시 사용자에게 알림을 추가할 수 있습니다.
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
        <Text style={styles.headerTitle}>오프라인 스터디 리스트</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.studyContainer}
        style={{ flexGrow: 1 }}
      >
        {offlineStudyList.map((study, index) => (
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
                    인원수: {study.selectedCategory || '없음'}
                  </Text>
                  <Text style={styles.studyInfoText}>
                    기간: {study.studyPeriod !== undefined ? study.studyPeriod : '없음'}
                  </Text>
                  <Text style={styles.studyInfoText}>
                    스터디 장소: {study?.location?.buildingName || '없음'}
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
              {selectedStudy.selectedCategory || '없음'}
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
            <Text style={styles.modalLabel}>스터디 장소:</Text>
            <Text style={styles.modalText}>
              {selectedStudy?.location?.buildingName || '없음'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.applyButton, styles.mapButton]}
            onPress={openMap}
          >
            <Text style={styles.applyButtonText}>스터디 장소 확인하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.applyButton, styles.applyNowButton]}
            onPress={applyForStudy} 
          >
            <Text style={styles.applyButtonText}>신청하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.modalText}>선택된 스터디가 없습니다.</Text>
      )}
      <TouchableOpacity
        style={[styles.applyButton, styles.closeButton]}
        onPress={() => setStudyModalVisible(false)}
      >
        <Text style={styles.applyButtonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
{/* 지도 모달 */}
<Modal
  animationType="slide"
  transparent={true}
  visible={isMapModalVisible}
  onRequestClose={() => setMapModalVisible(false)} // Android에서 뒤로 가기 버튼을 눌렀을 때도 모달이 닫히도록 함
>
  <View style={styles.centeredView}>
    <View style={styles.mapModalView}>
      <Text style={styles.modalTitle}>스터디 장소 위치 확인</Text>
      <View style={styles.mapContainer}>
        {selectedStudyLocation?.latitude && selectedStudyLocation?.longitude ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedStudyLocation.latitude,
              longitude: selectedStudyLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            apiKey="AIzaSyClF-Zniv8crtjJdTG-C49u_2Cvt14qYqM"
          >
            <Marker
              coordinate={{
                latitude: selectedStudyLocation.latitude,
                longitude: selectedStudyLocation.longitude,
              }}
              title={selectedStudyLocation.buildingName || '스터디 장소'}
            />
          </MapView>
        ) : (
          <Text style={styles.noLocationText}>위치 정보 없음</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.applyButton, styles.closeButton]}
        onPress={() => setMapModalVisible(false)}
      >
        <Text style={styles.applyButtonText}>닫기</Text>
      </TouchableOpacity>
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

});

export default OfflineStudyScreen;
