import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

const StudyList = () => {
  const [myStudies, setMyStudies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [studyType, setStudyType] = useState('all');

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        const fetchMyStudies = async () => {
          try {
            const querySnapshot = await getDocs(collection(firestore, 'offlineStudies'));

            const studiesData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.userId === user.uid) {
                studiesData.push({ id: doc.id, ...data });
              }
            });

            setMyStudies(studiesData);
          } catch (error) {
            console.error('Error fetching my studies:', error);
          } finally {
            setIsRefreshing(false);
          }
        };

        fetchMyStudies();
      } else {
        setCurrentUser(null);
        setMyStudies([]);
      }
    }, [isRefreshing]);

    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
  };

  const renderMyStudyItem = ({ item }) => {
    if (studyType === 'all' || (studyType === 'online' && item.isOnline) || (studyType === 'offline' && !item.isOnline)) {
      return (
        <TouchableOpacity>
          <View style={styles.studyItemContainer}>
            <View style={styles.studyTextContainer}>
              <Text style={[styles.labelText]}>스터디명: </Text>
              <Text style={[styles.studyTitle]}>{item.studygroupName}</Text>
            </View>
            <View style={styles.studyTextContainer}>
              <Text style={[styles.labelText]}>인원수: </Text>
              <Text style={[styles.valueText]}>{item.selectedCategory || '없음'}</Text>
            </View>
            <View style={styles.studyTextContainer}>
              <Text style={[styles.labelText]}>기간: </Text>
              <Text style={[styles.valueText]}>{item.studyPeriod !== undefined ? item.studyPeriod : '없음'}</Text>
            </View>
            <View style={styles.studyTextContainer}>
              <Text style={[styles.labelText]}>건물명: </Text>
              <Text style={[styles.valueText]}>{item.location?.buildingName || '없음'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내가 참여한 스터디 목록</Text>

      <View style={styles.toggleButtons}>
        <TouchableOpacity onPress={() => setStudyType('all')}>
          <Text style={studyType === 'all' ? styles.activeToggle : styles.inactiveToggle}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStudyType('online')}>
          <Text style={studyType === 'online' ? styles.activeToggle : styles.inactiveToggle}>온라인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStudyType('offline')}>
          <Text style={studyType === 'offline' ? styles.activeToggle : styles.inactiveToggle}>오프라인</Text>
        </TouchableOpacity>
      </View>

      {currentUser ? (
        <FlatList
          data={myStudies}
          keyExtractor={(item) => item.id}
          renderItem={renderMyStudyItem}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text>로그인이 필요합니다.</Text>
      )}
    </View>
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
  studyItemContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 
  studyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    padding: 8, // 텍스트 주변에 패딩 추가
    borderRadius: 5, // 모서리를 둥글게 만들기 위한 값
  },
  studyTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 18,
    color: 'black',
    // padding: 8, // 텍스트 주변에 패딩 추가
    borderRadius: 5, // 모서리를 둥글게 만들기 위한 값
    backgroundColor: '#e6f7ff', // 배경색 추가
  },
  valueText: {
    fontSize: 18,
    color: 'black', // 숫자 부분의 색상
    padding: 8, // 텍스트 주변에 패딩 추가
    borderRadius: 5, // 모서리를 둥글게 만들기 위한 값
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  activeToggle: {
    fontWeight: 'bold',
    color: '#3D4AE7',
    fontSize: 16,
  },
  inactiveToggle: {
    color: 'black',
   
  },
});

export default StudyList;
