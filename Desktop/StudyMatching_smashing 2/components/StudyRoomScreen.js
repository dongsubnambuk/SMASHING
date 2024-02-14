import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView,KeyboardAvoidingView } from 'react-native';
import { getFirestore, doc, deleteDoc, getDoc, setDoc, collection, query, where, orderBy, getDocs ,querySnapshot,docs} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();


const StudyRoomScreen = ({ route, navigation }) => {
  const { studyId, removeStudyFromList } = route.params;

  const [studyData, setStudyData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [editing, setEditing] = useState(false);
  const [inputNotice, setInputNotice] = useState('');


  const fetchStudyData = useCallback(async (firestore, user) => {
    try {
      const collectionPath = 'applystudy';
      const onlineStudyDocRef = doc(firestore, collectionPath, user.uid, 'onlineStudies', studyId);
      const offlineStudyDocRef = doc(firestore, collectionPath, user.uid, 'offlineStudies', studyId);

      const onlineStudySnapshot = await getDoc(onlineStudyDocRef);
      const offlineStudySnapshot = await getDoc(offlineStudyDocRef);

      if (onlineStudySnapshot.exists()) {
        setStudyData(onlineStudySnapshot.data());
      } else if (offlineStudySnapshot.exists()) {
        setStudyData(offlineStudySnapshot.data());
      } else {
        console.log('스터디를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('스터디 데이터 가져오기 오류:', error);
    }
  }, [studyId]);

  const fetchNotices = useCallback(async (firestore) => {
    try {
      // 해당 스터디 아이디에 해당하는 공지사항 목록을 가져와서 상태로 설정
      const noticesCollectionRef = collection(firestore, 'notices', studyId, 'list');
      const querySnapshot = await getDocs(query(noticesCollectionRef));
  
      const noticesData = [];
      querySnapshot.forEach((doc) => {
        noticesData.push({ id: doc.id, ...doc.data() });
      });
  
      // 상태로 설정
      setNotices(noticesData);
    } catch (error) {
      console.error('공지사항 데이터 가져오기 오류:', error);
    }
  }, [studyId]);
  
  
  const fetchData = useCallback(async () => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await fetchStudyData(firestore, user);
      await fetchNotices(firestore);
    }
  }, [fetchStudyData, fetchNotices]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  const confirmLeaveGroup = () => {
    Alert.alert(
      '그룹 탈퇴 확인',
      '정말로 그룹을 탈퇴하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: leaveGroup,
        },
      ],
      { cancelable: true }
    );
  };

  const leaveGroup = async () => {
    try {
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error('사용자 인증 실패');
            return;
        }

        const collectionPath = 'applystudy';
        const onlineStudyDocRef = doc(firestore, collectionPath, user.uid, 'onlineStudies', studyId);
        const offlineStudyDocRef = doc(firestore, collectionPath, user.uid, 'offlineStudies', studyId);

        const onlineStudySnapshot = await getDoc(onlineStudyDocRef);
        const offlineStudySnapshot = await getDoc(offlineStudyDocRef);

        if (onlineStudySnapshot.exists() || offlineStudySnapshot.exists()) {
            // 생성자일 경우에만 스터디 삭제
            if (onlineStudySnapshot.exists() && user.uid === onlineStudySnapshot.data().createdBy) {
                // 온라인 스터디를 삭제합니다.
                await deleteDoc(onlineStudyDocRef);
            }

            if (offlineStudySnapshot.exists() && user.uid === offlineStudySnapshot.data().createdBy) {
                // 오프라인 스터디를 삭제합니다.
                await deleteDoc(offlineStudyDocRef);
            }

            // studies 컬렉션에서 해당 스터디 삭제
            const studiesCollectionRef = collection(firestore, 'studies');
            const querySnapshot = await getDocs(query(studiesCollectionRef, where('studyId', '==', studyId)));
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            setStudyData(null);

            Alert.alert('그룹 탈퇴 완료', '그룹을 성공적으로 탈퇴하였습니다.');

            removeStudyFromList(studyId);

            navigation.goBack();
        } 
    } catch (error) {
        console.error('그룹 탈퇴 오류:', error);
    }
};

  
  

const handleNoticeSubmit = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || user.uid !== studyData.createdBy) { // 생성자 ID와 현재 사용자 ID 비교
      console.error('사용자 인증 실패 또는 권한이 없음');
      Alert.alert('작성 권한 없음', '스터디 등록자만 공지사항을 작성할 수 있습니다.');
      return;
    }

    // 새로운 공지사항을 Firestore에 추가
    await setDoc(doc(firestore, 'notices', studyId, 'list', Date.now().toString()), { notice: inputNotice, timestamp: new Date() });

    // 공지사항 목록을 다시 불러와 상태에 저장
    await fetchNotices(firestore);

    // 수정 모드를 종료하고 화면 갱신
    setEditing(false);
    setInputNotice(''); // 입력값 초기화
    Alert.alert('공지사항 등록 완료', '공지사항이 성공적으로 등록되었습니다.');
  } catch (error) {
    console.error('공지사항 저장 오류:', error);
  }
};

  
  
  useEffect(() => {
    // notices 상태가 변경될 때마다 화면을 업데이트
  }, [notices]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChatButtonPress = () => {
    navigation.navigate('ChatScreen');
  };

  return (
   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="close" size={34} color="#3D4AE7" />
            </TouchableOpacity>
        {studyData && (
          <>
            <Text style={styles.title}>{studyData.studygroupName}</Text>
            <View style={styles.imageContainer}>
              {studyData.thumbnail ? (
                <Image source={{ uri: studyData.thumbnail }} style={styles.image} />
              ) : (
                <Text>이미지를 찾을 수 없습니다.</Text>
              )}
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.noticeContainer}>
                <Text style={styles.notice}>공지사항</Text>
                <TouchableOpacity onPress={() => { 
                 
                  const auth = getAuth();
                  const user = auth.currentUser;
                  if (user && user.uid === studyData.createdBy) {
                    setEditing(true);
                  } else {
                    Alert.alert('작성 권한 없음', '스터디 등록자만 공지사항을 작성할 수 있습니다.');
                  }
                }}>
                  <Text style={styles.writeText}>글 쓰기</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.noticeListContainer}>
                {notices.map((notice, index) => (
                  <View key={index} style={styles.noticeItemContainer}>
                    <Text style={styles.noticeItem}>{notice.notice}</Text>
                  </View>
                ))}
              </ScrollView>
              {editing && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={inputNotice}
                    onChangeText={setInputNotice}
                    placeholder="공지사항을 입력하세요"
                  />
                  <TouchableOpacity onPress={handleNoticeSubmit} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>등록</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleChatButtonPress} style={styles.chatButton}>
          <Text style={styles.chatButtonText}>CHAT</Text>
        </TouchableOpacity>

              {studyData.createdBy === auth.currentUser.uid ? ( // 방 생성자일 때만 보이도록 함
                <TouchableOpacity onPress={confirmLeaveGroup} style={styles.leaveButton}>
                  <Text style={styles.leaveButtonText}>방 삭제하기</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={confirmLeaveGroup} style={styles.leaveButton}>
                  <Text style={styles.leaveButtonText}>그룹 탈퇴하기</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
      </KeyboardAvoidingView>
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
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    aspectRatio: 5 / 2,
    height: 200,
    resizeMode: 'contain'
  },
  contentContainer: {
    flex: 1,
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D4AE7',
  },
  writeText: {
    color: '#3D4AE7',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  noticeListContainer: {
    flex: 1,
    backgroundColor: '#E6E0F8',
    marginBottom: 10,
    borderRadius: 10,
    
  },
  noticeItemContainer: {
    marginLeft:"10%",
    alignItems: 'center',
    width:"80%",
    top:"10%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
  },
  noticeItem: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#3d4ae7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatButton: {
    width: "40%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#3d4ae7',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leaveButton: {
    width: "40%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  leaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    
    marginLeft: '86%',
    // padding: 10,
  },
});

export default StudyRoomScreen;
