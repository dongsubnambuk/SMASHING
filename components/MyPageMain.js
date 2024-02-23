import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase/auth";
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const MyPageMain = () => {
  const navigation = useNavigation();

  const navigateToAppSettings = () => {
    navigation.navigate("MyPageAppSetting");
  };

  const navigateToAlarmSettings = () => {
    navigation.navigate("MyPageNotificationSettings");
  };

  const navigateToOthers = () => {
    navigation.navigate("MyPageOthers");
  };

  const handleLogout = async () => {
    // 터치한 순간 확인 다이얼로그를 표시
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        {
          text: "예",
          onPress: async () => {
            try {
              // Firebase에서 로그아웃 처리
              await auth.signOut();
              console.log("로그아웃 되었습니다.");

              // SignUpFirstScreen으로 이동
              navigation.navigate("SignUpFirstScreen");
            } catch (error) {
              console.error("로그아웃 오류:", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleWithdraw = () => {
    navigation.navigate("WithdrawPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>마이페이지</Text>

      <TouchableOpacity style={styles.button} onPress={navigateToAppSettings}>
        <Text style={styles.buttonText}>앱 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToAlarmSettings}>
        <Text style={styles.buttonText}>알람 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToOthers}>
        <Text style={styles.buttonText}>기타</Text>
      </TouchableOpacity>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      {/* 회원탈퇴 버튼 */}
      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3d4ae7",
    padding: 15,
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#FF0000", // 로그아웃 버튼 색상
    padding: 15,
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  withdrawButton: {
    backgroundColor: "#FF0000", // 회원탈퇴 버튼 색상
    padding: 15,
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default MyPageMain;
