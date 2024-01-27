import React, { useState, useEffect,useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  Image,
  TouchableWithoutFeedback,
  Keyboard, // 추가
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '../firebaseConfig';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Linking } from 'react-native'; 

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

const Studyplus = () => {
  const [studygroupName, setStudygroupName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [studyPeriod, setStudyPeriod] = useState('');
  const [location, setLocation] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [initialLocation, setInitialLocation] = useState(null);
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false); // 추가
  const [isCalendarVisible, setCalendarVisible] = useState(false); // 추가된 부분
  const [isMapModalVisible, setMapModalVisible] = useState(false); // 맵 모달의 가시성 상태 
  const [isGoogleMapsModalVisible, setGoogleMapsModalVisible] = useState(false);
  const [googleMapUrl, setGoogleMapUrl] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  
  const mapViewRef = useRef(null);
  

  const navigation = useNavigation();

  const onLocationSelect = async () => {
    if (selectedMapLocation) {
      try {
        // 선택한 위치의 건물명 가져오기
        const buildingName = await getBuildingName(selectedMapLocation);
        console.log('Selected Building Name:', buildingName);
  
        // 선택한 위치를 Firebase에 저장
        await addDoc(collection(firestore, 'userSelectedLocations'), {
          latitude: selectedMapLocation.latitude,
          longitude: selectedMapLocation.longitude,
          buildingName: buildingName, // 건물명도 함께 저장
        });
  
        // 위치 초기화 및 지도 닫기
        setSelectedMapLocation(null);
        setMapVisible(false);
  
      } catch (error) {
        console.error('Error saving location to Firebase:', error);
        alert('위치를 Firebase에 저장하는 중 오류가 발생했습니다.');
      }
    } else {
      // 선택한 위치가 없는 경우에 대한 처리
      alert('선택한 위치 정보가 없습니다.');
    }
  };
  
  
  const categories = [
    { label: '인원수선택', value: '' },
    { label: '4명', value: '4명' },
    { label: '6명', value: '6명' },
    { label: '8명', value: '8명' },
  ];

  const openGoogleMaps = () => {
    if (location) {
      setGoogleMapsModalVisible(true);
    } else {
      alert('위치 정보가 없습니다.');
    }
  };

  const closeGoogleMapsModal = () => {
    setGoogleMapsModalVisible(false);
  };


  const onMapClick = (event) => {
    const clickedLocation = { latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude };
    setSelectedMapLocation(clickedLocation);
    setMapModalVisible(true); // 모달을 열도록 수정
  };
  const showConfirmationDialog = () => {
    Alert.alert(
      "위치 선택 확인",
      "이 위치로 선택하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        { text: "확인", onPress: onLocationSelect },
      ],
      { cancelable: false }
    );
  };

  const initializeLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Location permission not granted');
        alert('위치 권한이 허용되어 있지 않습니다.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});

      if (!initialLocation) {
        setInitialLocation(userLocation.coords);
      }

      setLocation(userLocation.coords);

      if (userLocation && !initialLocation) {
        await addDoc(collection(firestore, 'userLocations'), {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      }

      setMapVisible(true);
    } catch (error) {
      console.error('Error getting location: ', error);
      alert('위치 정보를 가져오는 데 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    initializeLocation();
  }, []);

  const onMapReady = () => {
    generateGoogleMapUrl();
  };


  const generateGoogleMapUrl = () => {
    if (!location) {
      return;
    }

    const latitude = location.latitude;
    const longitude = location.longitude;
    const apiKey = 'AIzaSyClF-Zniv8crtjJdTG-C49u_2Cvt14qYqM';
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&key=${apiKey}`;
    setGoogleMapUrl(url);
  };

  useEffect(() => {
    generateGoogleMapUrl();
  }, [location]);

  const getBuildingName = async (location) => {
    try {
      if (!location) {
        return '위치 정보 없음';
      }
  
      const reverseGeocodeResult = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });
  
      const buildingName = reverseGeocodeResult[0]?.name || '건물명 없음';
  
      return buildingName;
    } catch (error) {
      console.error('Error getting building name:', error);
      return '건물명 가져오기 실패';
    }
  };

  const onCreateStudyPress = async () => {
    try {
      const timestamp = new Date();
      const buildingName = await getBuildingName(selectedMapLocation);
  
      const docRef = await addDoc(collection(firestore, 'studies'), {
        studygroupName,
        selectedCategory,
        studyPeriod,
        latitude: selectedMapLocation ? selectedMapLocation.latitude : null,
        longitude: selectedMapLocation ? selectedMapLocation.longitude : null,
        thumbnail: thumbnailURL,
        isOnline,
        buildingName,
        createdAt: timestamp,
      });
  
      alert(`스터디 생성이 완료되었습니다.`);
      navigation.goBack();
    } catch (error) {
      console.error('스터디 생성 오류:', error);
      alert(`스터디 생성 중 오류가 발생했습니다.`);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setSelectedCategory(item.value);
        setCategoryModalVisible(false);
      }}
    >
      <Text style={styles.categoryItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const openImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('저장소 권한이 허용되어 있지 않습니다.');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageAsset = result.assets[0];
  
        // 이미지 리사이징
        const resizedImage = await resizeImage(imageAsset.uri, 800, 600);
  
        setThumbnail(resizedImage.uri);
        alert('이미지 선택을 완료했습니다.');
  
        // 이미지를 Blob으로 변환
        const response = await fetch(resizedImage.uri);
        const blob = await response.blob();
  
        // Firebase Storage에 업로드
        const imageRef = ref(storage, 'thumbnails/' + imageAsset.uri);
        await uploadBytes(imageRef, blob, { contentType: 'image/jpeg' });
  
        // 다운로드 URL을 가져와 상태에 저장
        const downloadURL = await getDownloadURL(imageRef);
        setThumbnailURL(downloadURL);
      }
    } catch (error) {
      console.error('이미지 선택 중 오류:', error);
      alert('이미지 선택 중 오류가 발생했습니다.');
    }
  };

  const resizeImage = async (uri, width, height) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width, height } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    return resizedImage;
  };

  const onDayPress = (day) => {
    setStudyPeriod(day.dateString);
    setCalendarVisible(false);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  
  
  const openMap = () => {
    initializeLocation();
    setMapVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SMASHING</Text>
        <Text style={styles.mystudygroup}>모임 만들기</Text>
        <Text style={styles.mystudygroup_under}>대충 있어 보이는 말</Text>

        <TextInput
          style={styles.textInput}
          placeholder="모임명"
          placeholderTextColor="#3D4AE7"
          onChangeText={(text) => setStudygroupName(text)}
          value={studygroupName}
        />
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryBoxText}>
            {selectedCategory ? `선택된 인원수: ${selectedCategory}` : '인원수선택'}
          </Text>
        </TouchableOpacity>

           {/* 인원수 선택 모달 */}
           <Modal
          animationType="slide"
          transparent={true}
          visible={isCategoryModalVisible}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.value}
              />
              <Button
                title="취소"
                onPress={() => setCategoryModalVisible(false)}
                color="#3D4AE7"
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={() => setCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{ [studyPeriod]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
              />
              <Button
                title="취소"
                onPress={() => setCalendarVisible(false)}
                color="#3D4AE7"
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.categoryBoxText}>
            {studyPeriod ? `학습 기간: ${studyPeriod}` : '학습 기간 선택'}
          </Text>
        </TouchableOpacity>

        <View style={styles.onlineOfflineButtonsContainer}>


  <TouchableOpacity
    style={[styles.onlineOfflineButton, isOnline ? styles.selectedButton : null]}
    onPress={() => setIsOnline(true)}
  >
    <Text style={styles.onlineOfflineButtonText}>온라인</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.onlineOfflineButton, !isOnline ? styles.selectedButton : null]}
    onPress={() => setIsOnline(false)}
  >
    <Text style={styles.onlineOfflineButtonText}>오프라인</Text>
  </TouchableOpacity>
</View>


<TouchableOpacity
  style={styles.locationButton}
  onPress={() => {
    openMap();
    setSearchLocation(null); // 검색 결과 초기화
  }}
>
  <Text style={styles.locationButtonText}>스터디 장소 확인</Text>
</TouchableOpacity>

<Modal
  animationType="slide"
  transparent={true}
  visible={mapVisible}
  onRequestClose={() => setMapVisible(false)}
>
<View style={styles.mapPopup}>
  <MapView
    ref={mapViewRef}
    style={styles.map}
    initialRegion={{
      latitude: initialLocation ? initialLocation.latitude : 37.7749,
      longitude: initialLocation ? initialLocation.longitude : -122.4194,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    onMapReady={onMapReady}
    onPress={onMapClick}
    provider={MapView.PROVIDER_GOOGLE}
    apiKey="AIzaSyClF-Zniv8crtjJdTG-C49u_2Cvt14qYqM"
  >
    {selectedMapLocation && (
      <Marker
        coordinate={{
          latitude: selectedMapLocation.latitude,
          longitude: selectedMapLocation.longitude,
        }}
      />
    )}

    {searchLocation && (
      <Marker
        coordinate={{
          latitude: searchLocation.latitude,
          longitude: searchLocation.longitude,
        }}
        pinColor="green"
      />
    )}
  </MapView>

  <View style={styles.mapSearchContainer}>
  <GooglePlacesAutocomplete
  placeholder='Search'
  onPress={(data, details = null) => {
    // 'details' is provided when fetchDetails = true
    console.log(data, details);
    const selectedPlace = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    setSelectedMapLocation(selectedPlace);
    setMapModalVisible(true); // 모달을 열도록 수정

    // 추가: 선택한 위치로 지도 이동
    mapViewRef.current.animateToRegion({
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }}
  query={{
    key: 'AIzaSyClF-Zniv8crtjJdTG-C49u_2Cvt14qYqM',
    language: 'en',
  }}
  fetchDetails={true}
  styles={{
    container: {
      flex: 0, // Remove container flex to eliminate padding
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingLeft: 0, // Remove left padding
      paddingRight: 0, // Remove right padding
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
  }}
/>

  </View>

  <TouchableOpacity
    style={styles.setMapLocationButton}
    onPress={onLocationSelect}
  >
    <Text style={styles.setMapLocationButtonText}>완료</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.closeMapButton}
    onPress={() => setMapVisible(false)}
  >
    <Text style={styles.closeMapButtonText}>닫기</Text>
  </TouchableOpacity>
</View>
</Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={() => setCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{ [studyPeriod]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
              />
              <Button
                title="취소"
                onPress={() => setCalendarVisible(false)}
                color="#3D4AE7"
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={() => setCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{ [studyPeriod]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
              />
              <Button
                title="취소"
                onPress={() => setCalendarVisible(false)}
                color="#3D4AE7"
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.createStudyButton}
          onPress={openImagePicker}
        >
          <Text style={styles.createStudyButtonText}>스터디 섬네일 삽입</Text>
        </TouchableOpacity>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailPreview} />
        )}

        <TouchableOpacity
          style={styles.createStudyButton}
          onPress={onCreateStudyPress}
        >
          <Text style={styles.createStudyButtonText}>스터디 생성하기</Text>
        </TouchableOpacity>
      
      </View>
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  title: {
    top: '7%',
    marginLeft: '5%',
    fontSize: 35,
    color: '#3D4AE7',
    fontWeight: 'bold',
  },
  mystudygroup: {
    top: '7.5%',
    marginLeft: '5%',
    fontSize: 28,
    fontWeight: 'bold',
  },
  mystudygroup_under: {
    top: '8%',
    marginLeft: '5%',
    fontSize: 20,
  },
  textInput: {
    top: '10%',
    margin: 15,
    height: 40,
    borderColor: '#3D4AE7',
    borderWidth: 1.5,
  },
  categoryBox: {
    top: '11%',
    margin: 15,
    padding: 10,
    borderColor: '#3D4AE7',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBoxText: {
    color: 'black',
    fontSize: 16,
  },
  locationButton: {
    // top: '11%',
    margin: 15,
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmationMessage: {
    top: '11%',
    margin: 15,
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  categoryItemText: {
    fontSize: 18,
    color: 'black',
  },
  createStudyButton: {
    // top: '15%',
    margin: 15,
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createStudyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    top: '5%', // 적절한 위치 조정
    marginLeft: '5%',
    padding: 10,
  },
  backButtonText: {
    color: '#3D4AE7',
    fontSize: 16,
  },
  onlineOfflineButtonsContainer: {
    marginTop:"25%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  onlineOfflineButton: {
    
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#fff',
    color: '#3D4AE7',
  },
  onlineOfflineButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  closeMapButton: {
    position: 'absolute',
    top: 50,
    left: "85%",
    padding: 10,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  
  closeMapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  setMapLocationButton: {
    position: 'absolute',
    bottom: 25,
    left: '45%',
    transform: [{ translateX: -50 }],
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setMapLocationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButton: {
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
  },

  mapPopup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  mapSearchContainer: {
    position: 'absolute',
    top: "9%",
    left: 0,
    right: 0,
    zIndex: 1, // Place search bar above the map
  },

  

});

export default Studyplus;