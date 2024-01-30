import React, { useState, useEffect,useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
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
import Slider from '@react-native-community/slider';


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
  const [isCalendarVisible, setCalendarVisible] = useState(false); // 추가된 부분
  const [isMapModalVisible, setMapModalVisible] = useState(false); // 맵 모달의 가시성 상태 
  const [googleMapUrl, setGoogleMapUrl] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(4);
  
  
  const mapViewRef = useRef(null);
  

  const navigation = useNavigation();

  const onLocationSelect = () => {
    if (selectedMapLocation) {
      showConfirmationDialog();
    } else {
      // 선택한 위치가 없는 경우에 대한 처리
      alert('선택한 위치 정보가 없습니다.');
    }
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
        {
          text: "확인",
          onPress: () => {
            saveLocationAndCloseMap();
            setMapVisible(false); // 맵이 꺼지도록 추가
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const saveLocationAndCloseMap = async () => {
    try {
      // 선택한 위치의 건물명 가져오기
      const buildingName = await getBuildingName(selectedMapLocation);
      console.log('Selected Building Name:', buildingName);

      // 선택한 위치를 Firebase에 저장
      const studyLocationRef = await addDoc(collection(firestore, 'studyLocations'), {
        latitude: selectedMapLocation.latitude,
        longitude: selectedMapLocation.longitude,
        buildingName,
      });

      // 맵 모달 닫기
      setMapModalVisible(false);
    } catch (error) {
      console.error('Error saving location:', error);
      alert('위치를 저장하는 중 오류가 발생했습니다.');
    }
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
    if (mapVisible) {
      initializeLocation();
    }
  }, [mapVisible]);

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
  
      // 스터디 위치 정보를 studyLocations 컬렉션에 저장
      const studyLocationRef = await addDoc(collection(firestore, 'studyLocations'), {
        latitude: selectedMapLocation ? selectedMapLocation.latitude : null,
        longitude: selectedMapLocation ? selectedMapLocation.longitude : null,
        buildingName,
      });
  
      // studyLocations에서 얻은 위치 정보의 ID를 활용하여 studies 컬렉션에 저장
      const studyLocationId = studyLocationRef.id;
      const docRef = await addDoc(collection(firestore, 'studies'), {
        studygroupName,
        selectedCategory,
        studyPeriod,
        location: {
          id: studyLocationId,
          latitude: selectedMapLocation ? selectedMapLocation.latitude : null,
          longitude: selectedMapLocation ? selectedMapLocation.longitude : null,
          buildingName,
        },
        thumbnail: thumbnailURL,
        isOnline,
        createdAt: timestamp,
      });
  
      alert(`스터디 생성이 완료되었습니다.`);
      navigation.goBack();
    } catch (error) {
      console.error('스터디 생성 오류:', error);
      alert(`스터디 생성 중 오류가 발생했습니다.`);
    }
  };

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
    setMapVisible(true);
  };

  const handleMapPress = (event) => {
    const { nativeEvent } = event;
    // 이제 nativeEvent를 사용할 수 있습니다.
    Keyboard.dismiss();
  };
  
 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.mystudygroup}>모임 만들기</Text>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Text style={styles.backButtonText}>뒤로가기</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.mystudygroup_under}>대충 있어 보이는 말</Text>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="모임명"
            placeholderTextColor='#7d7d7d'
            onChangeText={(text) => setStudygroupName(text)}
            value={studygroupName}
          />
        </View>

        <View style={styles.categoryBoxContainer}>
          <Text style={styles.categoryLabel}>{`선택된 인원수: ${selectedPeople}명`}</Text>
          <View style={styles.categoryBox}/>

          <Slider
            style={styles.slider}
            minimumValue={4}
            maximumValue={10}
            step={1}
            value={selectedPeople}
            onValueChange={(value) => {
              setSelectedPeople(value);
              setSelectedCategory(`${value}명`); // 선택된 카테고리도 업데이트
            }}
            minimumTrackTintColor="#3D4AE7" // 최소 트랙의 색상
            maximumTrackTintColor="#89a5f7" // 최대 트랙의 색상
            thumbTintColor="#3D4AE7" // 슬라이더 썸의 색상
          />
        </View>

        <View style={styles.periodBoxContainer}>
          <TouchableOpacity
            style={styles.periodBox}
            onPress={() => setCalendarVisible(true)}
          >
            <Text style={styles.periodBoxText}>
              {studyPeriod ? `학습 기간: ${studyPeriod}` : '학습 기간 선택'}
            </Text>
          </TouchableOpacity>
        </View>

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

        <View style={styles.thumbnailLocationButtonsContainer}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => {
            openMap();
            setSearchLocation(null); 
        
          }}
        >
          <Text style={styles.locationButtonText}>스터디 장소</Text>
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
            onPress={(event) => {
              handleMapPress(event);
              onMapClick(event);
            }}
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

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mapSearchContainer}>
          <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
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
              color: 'black',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          textInputProps={{
            placeholderTextColor: 'black', // 기본 입력 텍스트 색상 지정 (예: 흰색)
          }}
        />
          </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity
            style={styles.setMapLocationButton}
            onPress={onLocationSelect}
          >
            <Text style={styles.setMapLocationButtonText}>장소 선택하기</Text>
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
          style={styles.thumbnailButton}
          onPress={openImagePicker}
        >
          <Text style={styles.thumbnailButtonText}>스터디 섬네일</Text>
        </TouchableOpacity>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailPreview} />
        )}
      </View>
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

  textContainer: {
    flexDirection: 'row', // 추가된 부분
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
 
  mystudygroup: {
    // top: '7.5%',
    marginLeft: '5%',
    fontSize: 28,
    fontWeight: 'bold',
  },
  mystudygroup_under: {
    // top: '8%',
    marginLeft: '5%',
    fontSize: 20,
  },

  backButton: {
    // top: '5%', // 적절한 위치 조정
    marginLeft: '50%',
    // padding: 10,
  },
  backButtonText: {
    color: '#3D4AE7',
    fontSize: 16,
  },

  textInputContainer: {
    marginTop: '5%',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1, // 밑줄 추가
    borderColor: '#3D4AE7', // 밑줄 색상 지정
  },

  textInput: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
  },

  categoryBoxContainer: {
    marginTop: '5%',
    marginHorizontal: 15,
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D4AE7', // 밑줄 색상 지정
  },

  categoryLabel: {
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  
  // 업데이트된 스타일
  categoryBox: {
    padding: '3%',
    flexDirection: 'column', // 수직 방향으로 정렬
    alignItems: 'center',
  },
  
  categoryBoxText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },

  slider: {
    width: '100%',
    alignSelf: 'center', // 슬라이더를 가운데 정렬
  },
  
  sliderValue: {
    fontSize: 16,
    textAlign: 'center',
  },

  periodBoxContainer: {
    marginTop: '5%',
    marginHorizontal: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D4AE7', // 밑줄 색상 지정
  },
  
  periodBox: {
    borderRadius: 10,
    flexDirection: 'column', // 수직 방향으로 정렬
    alignItems: 'flex-start',
  },
  
  periodBoxText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },

  thumbnailLocationButtonsContainer: {
    // marginTop:"25%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: '5%',
  },

  thumbnailButton: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D4AE7', // 밑줄 색상 지정
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  locationButton: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D4AE7', // 밑줄 색상 지정
    justifyContent: 'center',
    alignItems: 'center',
  },

  locationButtonText: {
    color: 'black',
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
    width: '40%',
    marginHorizontal: '30%',
    marginTop: '5%',
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createStudyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  onlineOfflineButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: '5%',
  },

  onlineOfflineButton: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: '#89a5f7',
    borderRadius: 10,
    borderColor: '#3D4AE7', // 밑줄 색상 지정
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#3d65e7',
    color: '#3d65e7',
  },
  onlineOfflineButtonText: {
    color: 'white',
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
    left: '48%',
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
    top: "11%",
    left: 0,
    right: 0,
    zIndex: 1, // Place search bar above the map
  },

});

export default Studyplus;