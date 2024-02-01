import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const JoinPage = ({ navigation }) => {
  const handleGoogleSignUp = () => {
    // Navigate to Google sign-up page
    navigation.navigate('SignUpTypeSelection', { method: 'Google' });
  };

  const handleEmailSignUp = () => {
    // Navigate to Email sign-up page
    navigation.navigate('SignUpTypeSelection', { method: 'Email' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smasing}>SMASING</Text>
      <Text style={styles.studyDescription}>
        SMASING과 함께 스터디를 시작하세요!
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleGoogleSignUp}>
        <View style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Google로 가입하기</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleEmailSignUp}>
        <View style={styles.primaryButton}>
          <Text style={styles.buttonText}>이메일로 가입하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 360,
    height: 640,
    backgroundColor: "#FFFFFF",
    justifyContent: "center", // 세로 방향 중앙 정렬
    alignItems: "center", // 가로 방향 중앙 정렬
  },
  smasing: {
    width: 286,
    height: 24,
    left: 37,
    top: 304,
    // fontFamily: 'Ultra',  // 해당 폰트가 설치되어 있어야 합니다.
    fontSize: 50,
    lineHeight: 24,
    color: "#3D4AE7",
  },
  studyDescription: {
    width: 270,
    height: 16,
    left: 48,
    top: 348,
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#3D4AE7",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    gap: 8,
    width: 360,
    height: 42,
    left: 0,
    top: 514,
  },
  secondaryButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 168,
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3D4AE7",
    borderRadius: 8,
  },
  buttonText: {
    width: 44,
    height: 16,
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#3D4AE7",
  },
  primaryButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 168,
    height: 42,
    backgroundColor: "#3D4AE7",
    borderRadius: 8,
  },
  buttonTextPrimary: {
    width: 58,
    height: 16,
    fontSize: 18,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#FCFCFC",
  },
  group4: {
    width: 120,
    height: 130,
    left: 120,
    top: 134,
  },
  vector: {
    backgroundColor: "#3D4AE7",
    width: 30,
    height: 30,
    left: 14,
    top: 261,
  },
  group: {
    left: "48.01%",
    right: "40.46%",
    top: "34.73%",
    bottom: "58.75%",
  },
  vector1: {
    left: "48.01%",
    right: "40.46%",
    top: "34.73%",
    bottom: "58.75%",
    borderWidth: 1.5,
    borderColor: "#3D4AE7",
  },
  vector2: {
    left: "48.01%",
    right: "50.55%",
    top: "39.8%",
    bottom: "58.75%",
    borderWidth: 1.5,
    borderColor: "#3D4AE7",
  },
  vector3: {
    left: "51.61%",
    right: "44.06%",
    top: "36.18%",
    bottom: "63.82%",
    borderWidth: 1.5,
    borderColor: "#3D4AE7",
  },
});

export default JoinPage;
