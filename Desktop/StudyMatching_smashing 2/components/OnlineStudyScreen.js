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
  
    const getLocationAsync = async () => {
      try {
        const { statusForeground, statusBackground } = await Location.requestForegroundPermissionsAsync();
  
        if (statusForeground !== 'granted' || statusBackground !== 'granted') {
          console.error('Location permission not granted');
          setLocationModalVisible(true);
        } else {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation.coords);
          setLocationGranted(true);
        }
      } catch (error) {
        console.error('Error getting location: ', error);
        alert('위치 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };
  
    getOnlineStudyList();
    // 위치 권한 승인된 경우에만 위치 정보 가져오도록 변경
    if (isLocationGranted) {
      getLocationAsync();
    }
  }, [isLocationGranted]);

  const calculateDistance = (location1, location2) => {
    if (
      !location1 ||
      !location1.latitude ||
      !location1.longitude ||
      !location2 ||
      !location2.latitude ||
      !location2.longitude
    ) {
      console.error('Invalid locations provided');
      return '없음';
    }

    const R = 6371;
    const dLat = deg2rad(location2.latitude - location1.latitude);
    const dLon = deg2rad(location2.longitude - location1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location1.latitude)) *
        Math.cos(deg2rad(location2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);  // 소수점 두 번째 자리까지 나타내기
  };


  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        setLocationGranted(true);
        setLocationModalVisible(false);
      } else {
        console.error('Location permission not granted');
        alert('위치 권한이 허용되어 있지 않습니다.');
      }
    } catch (error) {
      console.error('Error getting location: ', error);
      alert('위치 정보를 가져오는 데 문제가 발생했습니다.');
    }
  };

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
      <View style={styles.studyContentWrapper}>
        <Image source={{ uri: study.thumbnail }} style={styles.studyThumbnail} />
        <View style={styles.studyContent}>
          <Text style={styles.studyTitle}>{study.studygroupName}</Text>
          <View style={styles.studyInfo}>
            <Text style={styles.studyInfoText}>인원수: {study.selectedCategory || '없음'}</Text>
            <Text style={styles.studyInfoText}>기간: {study.studyPeriod !== undefined ? study.studyPeriod : '없음'}</Text>
            {study.latitude !== undefined && study.longitude !== undefined && location !== null ? (
  <Text style={styles.studyInfoText}>
    거리: {calculateDistance(location, {latitude: study.latitude, longitude: study.longitude})} km
    {location.latitude === study.latitude &&
    location.longitude === study.longitude ? (
      <Text style={styles.studySameLocation}>
        {'\n'}스터디 생성 위치와 동일
      </Text>
    ) : (
      // 현재 위치와 스터디 위치의 차이를 출력
      <Text style={styles.studyInfoText}>
        위치 차이: {calculateDistance(location, {latitude: study.latitude, longitude: study.longitude})} km
      </Text>
    )}
  </Text>
) : (
  <Text style={styles.studyInfoText}>거리: 거리 없음</Text>
)}
          
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
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              위치 권한이 필요합니다. 승인하시겠습니까?
            </Text>
            <Button
              title="승인"
              onPress={requestLocationPermission}
            />
          </View>
        </View>
      </Modal>
      {isLocationGranted && (
        <View style={styles.permissionMessage}>
          <Text style={styles.permissionMessageText}>
            위치 권한이 승인되었습니다.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  studyContainer: {
    // top: '5%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  studyItem: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  studyContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studyThumbnail: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  studyContent: {
    flex: 1,
    padding: 10,
  },
  studyTitle: {
    fontSize: 18,  // 조절 가능
    fontWeight: 'bold',
  },
  studyDetail: {
    fontSize: 14,  // 조절 가능
    color: '#888',
  },
  studySameLocation: {
    fontSize: 14,  // 조절 가능
    color: 'green',
  },
  header: {
    // top: '12%',
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
});

export default OnlineStudyScreen;
