// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Studyplusbtn from './Studyplusbtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const HomeScreen = () => {
  const navigation = useNavigation();

  const [locationPermission, setLocationPermission] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cachedLocation, setCachedLocation] = useState(null);
  const [locationListener, setLocationListener] = useState(null);

  const checkLocationPermission = async () => {
    try {
      const { statusForeground, statusBackground } = await Location.requestForegroundPermissionsAsync();

      if (statusForeground === 'granted' && statusBackground === 'granted') {
        // 권한이 승인되면 위치 리스너 등록
        const listener = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 5000, distanceInterval: 5 },
          (location) => {
            setCachedLocation(location.coords);
          }
        );

        setLocationListener(listener);

        // 위치 권한이 승인되었다는 정보를 AsyncStorage에 저장
        await AsyncStorage.setItem('locationPermission', 'granted');

        setLocationPermission(true);
      } else {
        console.error('Location permission not granted');
        setLocationPermission(false);
      }
    } catch (error) {
      console.error('Error checking location permission: ', error);
      setLocationPermission(false);
    }
  };

  const handleButtonOnline = async () => {
    try {
      if (!locationPermission) {
        // 위치 권한이 없을 때만 폼 보이기
        setModalVisible(true);
        return;
      }

      if (cachedLocation) {
        // 캐시된 위치 정보 사용
        console.log('Cached Location:', cachedLocation);
        navigation.navigate('OnlineStudyScreen');
      } else {
        console.warn('No cached location available.');
        // 캐시된 위치가 없으면 현재 위치 가져와서 캐시
        const currentLocation = await Location.getCurrentPositionAsync({});
        setCachedLocation(currentLocation.coords);
        console.log('Current Location:', currentLocation.coords);
        navigation.navigate('OnlineStudyScreen');
      }
    } catch (error) {
      console.error('Error getting location: ', error);
      setLocationPermission(false);
      setModalVisible(true);
    }
  };

  const handleButtonOffline = () => {
    navigation.navigate('OfflineStudyScreen');
  };

  const handleModalConfirm = async () => {
    setModalVisible(false);

    try {
      // 위치 권한이 승인되면 현재 위치 받아오기
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);

        const currentLocation = await Location.getCurrentPositionAsync({});
        setCachedLocation(currentLocation.coords);

        Alert.alert('위치 권한이 승인되었습니다.', '온라인 스터디 페이지로 이동합니다.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('OnlineStudyScreen'),
          },
        ]);
      } else {
        console.error('Location permission not granted');
        setLocationPermission(false);
      }
    } catch (error) {
      console.error('Error getting location: ', error);
      setLocationPermission(false);
    }
  };

  useEffect(() => {
    // 앱이 로딩되고 메인 화면에 진입할 때 위치 권한 확인
    checkLocationPermission();
  }, []);

  return (
  <View style={styles.container}>
  <View style={styles.subHeader}>
    <Text style={{ fontSize: windowWidth * 0.055, fontWeight: '800' }}>
      스터디 찾기
    </Text>
    <Text style={{ fontSize: windowWidth * 0.04, fontWeight: '500' }}>
      대충 있어보이는 말
    </Text>
  </View>
  <Studyplusbtn />
  <View style={styles.searchSection}>
    <Ionicons style={styles.searchIcon} resizeMode="contain" name="search" size={windowHeight * 0.04} color="#3D4AE7" />
    <TextInput
      placeholder={"게시물 찾기"}
      style={styles.input}
    />
  </View>
  <View>
    <Text style={styles.onOffTitle}>온라인 / 오프라인 스터디 리스트</Text>
  </View>
  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={handleButtonOnline} style={styles.button}>
      <Text style={styles.buttonText}>온라인</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleButtonOffline} style={styles.button}>
      <Text style={styles.buttonText}>오프라인</Text>
    </TouchableOpacity>
  </View>

      <View>
        <Text style={styles.sectionTitle}>To Do List</Text>
      </View>
      <View style={styles.toDoArea}>
        <ScrollView style={styles.toDoListContainer} showsVerticalScrollIndicator={false}>
          {[...Array(10)].map((_, index) => (
            <View key={index} style={styles.toDoList}>
              <Text style={styles.toDoTitle}>목표</Text>
              <Text style={styles.toDoDetail}>세부 목표</Text>
            </View>
          ))}
        </ScrollView>
      </View>
  
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>앱을 사용하기 위해서는 위치 권한이 필요합니다.</Text>
            <TouchableOpacity onPress={handleModalConfirm} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>확인</Text>
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
  },
  subHeader: {
    paddingVertical: windowHeight * 0.005,
    paddingHorizontal: windowWidth * 0.05,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.05,
    height: windowHeight * 0.05,
  },
  searchIcon: {
    padding: windowHeight * 0.005,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    color: '#424242',
  },
  onOffTitle: {
    fontSize: windowWidth * 0.035,
    color: '#3D4AE7',
    fontWeight: '600',
    marginLeft: windowWidth * 0.06,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.045,
  },
  button: {
    flex: 1,
    paddingVertical: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.004,
    backgroundColor: "#3D4AE7",
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.05,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: windowWidth * 0.05,
    color: '#3D4AE7',
    fontWeight: '700',
    marginLeft: windowWidth * 0.06,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.008,
  },
  toDoArea: {
    flex: 1,
    backgroundColor: '#E6E0F8',
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: 20,
  },
  toDoListContainer: {
    borderRadius: 20,
  },
  toDoList: {
    paddingVertical: windowHeight * 0.012,
    paddingHorizontal: windowWidth * 0.04,
    marginBottom: windowHeight * 0.015,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  toDoTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
  },
  toDoDetail: {
    fontSize: windowWidth * 0.031,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3D4AE7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
