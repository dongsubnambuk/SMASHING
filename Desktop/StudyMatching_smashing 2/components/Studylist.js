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
  Image,
} from 'react-native';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import * as Location from 'expo-location';
import 'firebase/storage';

const StudyList = ({ navigation }) => {
  const [studyList, setStudyList] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const fetchStudyList = async () => {
      const studiesCollection = collection(firestore, 'studies');
      const studiesSnapshot = await getDocs(query(studiesCollection, orderBy('createdAt', 'desc')));
    
      const studiesData = [];
      studiesSnapshot.forEach((doc) => {
        studiesData.push({ id: doc.id, ...doc.data() });
      });
    
      setStudyList(studiesData);
    };
    
    

    fetchStudyList();

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

    getLocation();
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
    if (!location1 || !location2) {
      // location1 또는 location2가 null인 경우 0을 반환하거나 다른 처리를 수행할 수 있습니다.
      console.error('Invalid locations provided');
      return 0;
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
    return distance.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const fetchThumbnail = (study) => {
    return study.thumbnail;
  };

  const renderThumbnail = (study) => {
    const thumbnailUrl = fetchThumbnail(study);
    return thumbnailUrl ? (
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
    ) : (
      <Text style={styles.thumbnailPlaceholder}>썸네일 없음</Text>
    );
  };

  // 정렬 옵션 상태 추가
  const [sortOption, setSortOption] = useState('latest');

  // 정렬 함수
  const sortStudies = (option) => {
    setSortOption(option);
    setStudyList(prevStudies => {
      let sortedStudies = [...prevStudies];
  
      if (option === 'latest') {
        sortedStudies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (option === 'distance') {
        sortedStudies.sort((a, b) => {
          const distanceA = calculateDistance(location, a);
          const distanceB = calculateDistance(location, b);
          return distanceA - distanceB;
        });
      }
  
      // console.log('Sorted studies:', sortedStudies);  // 로그 추가
  
      return [...sortedStudies];  // 수정된 부분
    });
  };
  
  

  // 스터디 아이템을 렌더링하는 함수
  const renderStudyItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleStudyPress(item)}>
      <View style={styles.studyItemContainer}>
        <View style={styles.thumbnailContainer}>{renderThumbnail(item)}</View>
        <View style={styles.studyInfoContainer}>
          <Text style={styles.studyInfoText}>스터디명: {item.studygroupName}</Text>
          <Text style={styles.studyInfoText}>인원수: {item.selectedCategory}</Text>
          <Text style={styles.studyInfoText}>기간: {item.studyPeriod}</Text>
          {item.latitude && item.longitude && (
            <Text style={styles.studyInfoText}>
              나와의 거리 약: {calculateDistance(location, item)} km
              {location.latitude === item.latitude && location.longitude === item.longitude && (
                <Text style={styles.studyInfoSameLocation}>
                  {"\n"}스터디 생성 위치와 동일
                </Text>
              )}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={handleCloseModal}>
      <View style={styles.container}>
        <Text style={styles.title}>스터디룸 리스트</Text>
        
        <TouchableOpacity
  style={styles.sortContainer}
  onPress={() => {}}
  activeOpacity={1} // 터치 이펙트 비활성화
>
  <Text
    style={[styles.sortText, sortOption === 'latest' && styles.selectedSortText]}
    onPress={() => sortStudies('latest')}
  >
    최신순
  </Text>
  <Text
    style={[styles.sortText, sortOption === 'distance' && styles.selectedSortText]}
    onPress={() => sortStudies('distance')}
  >
    거리순
  </Text>
</TouchableOpacity>

        <FlatList
  data={studyList}
  keyExtractor={(item) => item.id}
  renderItem={renderStudyItem}
  contentContainerStyle={{ flexGrow: 1 }}
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
                    <Text style={styles.studyInfoText}>
                      나와의 거리 약: {calculateDistance(location, selectedStudy)} km
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
    top: '5%',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studyItemContainer: {
    marginTop:"5%",
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  thumbnailContainer: {
    marginRight: 10,
  },
  studyInfoContainer: {
    flex: 1,
  },
  studyInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  studyInfoSameLocation: {
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
  thumbnail: {
    width: 80, // 변경된 부분: 원하는 크기로 조절 가능
    height: 80, // 변경된 부분: 원하는 크기로 조절 가능
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailPlaceholder: {
    fontSize: 16,
    marginBottom: 10,
  },
  // 정렬 텍스트 스타일 추가
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginTop:"10%"
  },
  sortText: {
    fontSize: 22,
    
    // textDecorationLine: 'underline',
    marginBottom: 10,
    marginRight: 10,
  },
  selectedSortText: {
    fontWeight: 'bold',
    color: '#3D4AE7',
  },
});

export default StudyList;
