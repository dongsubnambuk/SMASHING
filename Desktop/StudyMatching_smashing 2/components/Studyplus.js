
// Studyplus.js
import React, { useState, useEffect } from 'react';
import { ScrollView,View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Button, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage 관련 import 수정
import { firebaseConfig } from '../firebaseConfig';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // 추가
import 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator'; 
import WebView from 'react-native-webview';  // WebView import 추가


// 파베 초기화
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

const Studyplus = () => {
  const [studygroupName, setStudygroupName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [studyPeriod, setStudyPeriod] = useState('');
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [isOnline, setIsOnline] = useState(false); 
  const navigation = useNavigation();
  const [kakaoMapUrl, setKakaoMapUrl] = useState(''); 
  const [mapVisible, setMapVisible] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [initialLocation, setInitialLocation] = useState(null);



 
  const WebViewMap = () => {
    // location이 없거나 mapVisible이 false이면 null을 반환하도록 수정
    if (!mapVisible || !initialLocation) {
      return null;
    }

    const { latitude, longitude } = initialLocation;
    const apiKey = 'a36b9a0588e2744f1917a9104e19fb08'; // 카카오맵 API 키
    const url = `https://map.kakao.com/link/map/${latitude},${longitude}?apikey=${apiKey}`;

    return (
      <WebView
        source={{ uri: url }}
        style={{ flex: 1, width: '100%', height: '100%' }}
      />
    );
  };
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        // 위치 권한 요청
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.error('Location permission not granted');
          alert('위치 권한이 허용되어 있지 않습니다.');
          return;
        }

        // 현재 위치 가져오기
        let userLocation = await Location.getCurrentPositionAsync({});
        
        // 최초 한 번만 위치 설정
        if (!initialLocation) {
          setInitialLocation(userLocation.coords);
        }

        setLocation(userLocation.coords);

        // 사용자의 위치를 파이어베이스에 저장 (최초 한 번만)
        if (userLocation && !initialLocation) {
          await addDoc(collection(firestore, 'userLocations'), {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          });
        }

        // 위치 확인 메시지 업데이트
        setConfirmationMessage('확인했습니다!');
        generateKakaoMapUrl(); // 위치를 가져오고 나서 맵 URL 생성
        setMapVisible(true); // 맵을 열도록 상태 업데이트
      } catch (error) {
        console.error('Error getting location: ', error);
        alert('위치 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    initializeLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocation]);

  const openKakaoMap = async () => {
    try {
      await initializeLocation(); // 위치를 가져옴
      setMapVisible(true); // 맵을 열도록 상태 업데이트
    } catch (error) {
      console.error('Error opening Kakao Map: ', error);
      alert('카카오 맵을 열 수 없습니다.');
    }
  };

  const generateKakaoMapUrl = () => {
    if (!location) {
      return; // 위치가 없으면 갱신하지 않음
    }
  
    const latitude = location.latitude;
    const longitude = location.longitude;
    const apiKey = 'a36b9a0588e2744f1917a9104e19fb08'; // 카카오맵 API 키
    const url = `https://map.kakao.com/link/map/${latitude},${longitude}?apikey=${apiKey}`;
    setKakaoMapUrl(url);
  };
  
  // 위치가 변경될 때마다 카카오맵 URL을 갱신
  useEffect(() => {
    generateKakaoMapUrl();
  }, [location]);

  const categories = [
    { label: '인원수선택', value: '' },
    { label: '4명', value: '4명' },
    { label: '6명', value: '6명' },
    { label: '8명', value: '8명' },
  ];

 useEffect(() => {
  // 최초 렌더링 시에만 실행
  const generateKakaoMapUrl = () => {
    const latitude = location ? location.latitude : 37.56669;
    const longitude = location ? location.longitude : 126.97847;
    const apiKey = 'a36b9a0588e2744f1917a9104e19fb08'; // 카카오맵 API 키
    const url = `https://map.kakao.com/link/map/${latitude},${longitude}?apikey=${apiKey}`;
    setKakaoMapUrl(url);
  };

  generateKakaoMapUrl();
}, []); // 빈 의존성 배열로 변경

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

  


  const onCreateStudyPress = async () => {
    try {
      // 현재 타임스탬프 가져오기
      const timestamp = new Date();

      // 타임스탬프를 포함하여 새로운 스터디 문서 생성
      const docRef = await addDoc(collection(firestore, 'studies'), {
        studygroupName,
        selectedCategory,
        studyPeriod,
        latitude: location ? location.latitude : null,
        longitude: location ? location.longitude : null,
        thumbnail: thumbnailURL,
        isOnline,  // 온라인 여부 추가
        createdAt: timestamp, // 타임스탬프 필드 추가
      });

      alert(`스터디 생성이 완료되었습니다.`);
      navigation.goBack();
    } catch (error) {
      console.error('스터디 생성 오류:', error);
      alert(`스터디 생성 중 오류가 발생했습니다.`);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
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
  onPress={openKakaoMap}
>
  <Text style={styles.locationButtonText}>내 위치 설정하기</Text>
</TouchableOpacity>
{mapVisible && (
      <Modal
        animationType="slide"
        transparent={false}
        visible={mapVisible}
        onRequestClose={() => setMapVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <WebViewMap />
          <TouchableOpacity
            style={styles.closeMapButton}
            onPress={() => setMapVisible(false)}
          >
            <Text style={styles.closeMapButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )}


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
  },
  closeMapButton: {
    position: 'absolute',
    top: 50,
    left: 20,
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

});

export default Studyplus;
