// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <Text style={{ fontSize: 23, fontWeight: '800' }}>
          스터디 찾기
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          대충 있어보이는 말
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={30} color="#3D4AE7" />
        <TextInput
          placeholder={"게시물 찾기"}
          style={styles.input}
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 10, }}>
        <Text style={{ fontSize: 15, color: 'blue', fontWeight: '700' }}>
          온라인 / 오프라인 스터디 리스트
        </Text>
      </View>
      <View style={{ flexDirection: "row", margin: 5, }}>
        <TouchableOpacity onPress={handleButtonOnline} style={{ ...styles.button, marginLeft: 10, marginRight: 2 }}>
          <Text style={styles.buttonText}>온라인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleButtonOffline} style={{ ...styles.button, marginRight: 10, marginLeft: 2 }}>
          <Text style={styles.buttonText}>오프라인</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
        <Text style={{ fontSize: 20, color: 'blue', fontWeight: '700' }}>
          To Do List
        </Text>
      </View>
      <ScrollView style={styles.ToDoArea}>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
        <View style={styles.ToDoList}>
          <Text style={styles.ToDoTitle}>목표</Text>
          <Text style={styles.ToDoDetail}>세부 목표</Text>
        </View>
      </ScrollView>
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
    backgroundColor: 'white',
    height: "100%",
    // top:"10%"
  },
  subHeader: {

    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 25,
    fontSize: 80,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    marginVertical: 20,
    height: 45,
    margin: 10,
  },
  searchIcon: {
    flex: 1,
    padding: 5,
  },
  input: {
    flex: 9,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    color: '#424242',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#3D4AE7",
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  },
  ToDoArea: {
    height: "53%",
    backgroundColor: '#E6E0F8',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
  },
  ToDoList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  ToDoTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  ToDoDetail: {
    fontSize: 13,
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
