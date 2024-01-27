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
  TextInput,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import * as Location from 'expo-location';

import 'firebase/storage';

const StudyList = ({ navigation }) => {
  const [studyList, setStudyList] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [location, setLocation] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchStudyList = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);

        const studiesCollection = collection(firestore, 'studies');
        const studiesSnapshot = await getDocs(query(studiesCollection, orderBy('createdAt', 'desc')));

        const studiesData = [];
        studiesSnapshot.forEach((doc) => {
          studiesData.push({ id: doc.id, ...doc.data() });
        });

        const filteredStudies = studiesData.filter((study) =>
          study.studygroupName.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        filteredStudies.sort((a, b) => {
          const distanceA = calculateDistance(location, a);
          const distanceB = calculateDistance(location, b);
          return distanceA - distanceB;
        });

        const updatedSelectedStudy = filteredStudies.find((study) => study.id === selectedStudy?.id);
        setSelectedStudy(updatedSelectedStudy || null);

        setStudyList(filteredStudies);
      } catch (error) {
        console.error('Error fetching study list:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    };
    const getLocationAsync = async () => {
      try {
        // 위치 권한 요청
        const { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
          console.error('Location permission not granted');
          alert('위치 권한이 허용되어 있지 않습니다.');
          return;
        }
    
        // 현재 위치 가져오기
        console.log('Before getting location');
        const currentLocation = await Location.getCurrentPositionAsync({});
        console.log('Current location:', currentLocation);
        
        // 위치 설정
        setLocation(currentLocation.coords);
      } catch (error) {
        console.error('Error getting location: ', error);
        alert('위치 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };
    

    fetchStudyList();
    getLocationAsync();
  }, [searchKeyword]);

  const handleSearch = () => {
    fetchStudyList();
  };

  const handleApplyPress = () => {
    alert('스터디 참가 신청이 완료되었습니다.');
    setSelectedStudy(null);
  };

  const handleCloseModal = () => {
    setSelectedStudy(null);
  };

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

  const renderThumbnail = (study) => {
    return study.thumbnail ? (
      <Image source={{ uri: study.thumbnail }} style={styles.thumbnail} />
    ) : (
      <Text style={styles.thumbnailPlaceholder}>썸네일 없음</Text>
    );
  };

  const handleStudyPress = (study) => {
    // study가 null이면 선택하지 않은 상태로 설정
    setSelectedStudy(study || null);
  };
   

  const renderStudyItem = ({ item }) => {
    if (!item) {
      console.error('Invalid study item:', item);
      return null;
    }
  
    const distance =
      location &&
      location.latitude &&
      location.longitude &&
      item.latitude &&
      item.longitude
        ? calculateDistance(location, item)
        : 0;
  
    return (
      <TouchableOpacity onPress={() => handleStudyPress(item)}>
        <View style={styles.studyItemContainer}>
          <View style={styles.thumbnailContainer}>{renderThumbnail(item)}</View>
          <View style={styles.studyInfoContainer}>
            <Text style={styles.studyInfoText}>스터디명: {item.studygroupName}</Text>
            <Text style={styles.studyInfoText}>인원수: {item.selectedCategory}</Text>
            <Text style={styles.studyInfoText}>기간: {item.studyPeriod}</Text>
            {distance > 0 && (
              <Text style={styles.studyInfoText}>
                {distance === 0 ? (
                  <Text style={styles.studyInfoSameLocation}>스터디 생성 위치와 동일</Text>
                ) : (
                  `나와의 거리: 약 ${distance} km`
                )}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseModal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <Text style={styles.title}>스터디룸 리스트</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="검색"
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          onSubmitEditing={handleSearch}
        />

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
                  {selectedStudy.latitude !== undefined && selectedStudy.longitude !== undefined && (
  <Text style={styles.studyInfoText}>
    나와의 거리 약: {calculateDistance(location, selectedStudy)} km
    {location.latitude === selectedStudy.latitude &&
      location.longitude === selectedStudy.longitude && (
        <Text style={styles.studyInfoSameLocation}>
          {'\n'}스터디 생성 위치와 동일
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
    fontSize: 28,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  studyItemContainer: {
    marginTop: 10,
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
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailPlaceholder: {
    fontSize: 16,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    // marginTop: 10,
  },
  backButton: {
   
   marginLeft:"85%"
  },
  backButtonText: {
    color: '#3D4AE7',
    fontSize: 16,
  },
});

export default StudyList;
