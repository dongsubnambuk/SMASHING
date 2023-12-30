// StudyDetail.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

const StudyDetail = ({ route, navigation }) => {
  const { studyId } = route.params;
  const [studyDetails, setStudyDetails] = useState({
    studygroupName: '',
    selectedCategory: '',
    studyPeriod: '',
    // 기타 스터디 정보 추가
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const fetchStudyDetails = async () => {
      const studyDocRef = doc(firestore, 'studies', studyId);
      const studyDocSnap = await getDoc(studyDocRef);

      if (studyDocSnap.exists()) {
        setStudyDetails({
          id: studyDocSnap.id,
          ...studyDocSnap.data(),
        });
      }
    };

    fetchStudyDetails();
  }, [studyId]);

  const handleApplyPress = async () => {
    // 여기에 스터디 참가 신청 로직을 추가하세요.
    // 스터디 참가 신청 성공 시에는 사용자에게 알림 등을 추가할 수 있습니다.
    alert('스터디 참가 신청이 완료되었습니다.');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>스터디 상세 정보</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.title}>{studyDetails.studygroupName}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>인원수:</Text>
                <Text style={styles.infoText}>{studyDetails.selectedCategory}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>기간:</Text>
                <Text style={styles.infoText}>{studyDetails.studyPeriod}</Text>
              </View>
              {/* 기타 스터디 정보 표시 */}
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
                <Text style={styles.applyButtonText}>스터디 참가 신청</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    padding: 15,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontSize: 20,
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
  cancelButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#aaa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudyDetail;
