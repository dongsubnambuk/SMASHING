// StudyList.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import * as Location from 'expo-location'; // Expo Location 추가

const StudyList = ({ navigation }) => {
  const [studyList, setStudyList] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [location, setLocation] = useState(null); // 추가: 사용자 위치

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const fetchStudyList = async () => {
      const studiesCollection = collection(firestore, 'studies');
      const studiesSnapshot = await getDocs(studiesCollection);

      const studiesData = [];
      studiesSnapshot.forEach((doc) => {
        studiesData.push({ id: doc.id, ...doc.data() });
      });

      setStudyList(studiesData);
    };

    fetchStudyList();

    // 추가: 사용자 위치 가져오기
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.error('Location permission not granted');
          alert('위치 권한이 허용되어 있지 않습니다.');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        console.error('Error getting location: ', error);
        alert('위치 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    getLocation(); // 사용자 위치 가져오기 호출
  }, []);

  const handleStudyPress = (study) => {
    setSelectedStudy(study);
  };

  const handleApplyPress = () => {
    alert('스터디 참가 신청이 완료되었습니다.');
    setSelectedStudy(null);
  };

  const handleCloseModal = () => {
    setSelectedStudy(null);
  };

  const calculateDistance = (location1, location2) => {
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
    return distance.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseModal}>
      <View style={styles.container}>
        <Text style={styles.title}>스터디룸 리스트</Text>
        <FlatList
          data={studyList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleStudyPress(item)}>
              <View style={styles.studyContainer}>
                <Text style={styles.studyInfo}>스터디명: {item.studygroupName}</Text>
                <Text style={styles.studyInfo}>인원수: {item.selectedCategory}</Text>
                <Text style={styles.studyInfo}>기간: {item.studyPeriod}</Text>
                {item.latitude && item.longitude && selectedStudy && (
                  <Text style={styles.studyInfo}>
                    나와의 거리: {calculateDistance(location, item)} km
                    {location.latitude === item.latitude && location.longitude === item.longitude && (
                      <Text style={styles.studyInfoSameLocation}>
                        {"\n"}스터디 생성 위치와 동일
                      </Text>
                    )}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />

        {selectedStudy && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={!!selectedStudy}
            onRequestClose={handleCloseModal}
          >
            <ScrollView
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled"
            >
              <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPressOut={handleCloseModal}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.title}>{selectedStudy.studygroupName}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>인원수:</Text>
                    <Text style={styles.infoText}>{selectedStudy.selectedCategory}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>기간:</Text>
                    <Text style={styles.infoText}>{selectedStudy.studyPeriod}</Text>
                  </View>
                  {selectedStudy.latitude && selectedStudy.longitude && (
                    <Text style={styles.studyInfo}>
                      나와의 거리: {calculateDistance(location, selectedStudy)} km
                      {location.latitude === selectedStudy.latitude && location.longitude === selectedStudy.longitude && (
                        <Text style={styles.studyInfoSameLocation}>
                          {"\n"}스터디 생성 위치와 동일
                        </Text>
                      )}
                    </Text>
                  )}

                  <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
                    <Text style={styles.applyButtonText}>신청하기</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    top:"5%",
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studyContainer: {
    top:"50%",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  studyInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  studyInfoSameLocation: { // 추가: 동일한 위치를 나타내는 스타일
    fontSize: 16,
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudyList;
