import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SignUpFirstScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("LoginPage");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUpTypeSelection");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smasing}>SMASING</Text>
      <Text style={styles.studyDescription}>
        SMASING과 함께 스터디를 시작하세요!
      </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLogin}
      >
        <View style={styles.secondaryButton}>
          <Text style={styles.buttonText}>로그인</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 98,
    marginTop: 250,
  },
  smasing: {
    fontSize: 50,
    color: '#3D4AE7',
    fontFamily: 'Ultra',
    lineHeight: 54, 
  },
  smasing_: {
    fontSize: 18,
    color: '#3D4AE7',
   // fontFamily: 'SeoulNamsanCB', 
    letterSpacing: 0.02,
    lineHeight: 16, 
  },
  button: {
    width: 360,
    height: 42,
    marginLeft: 0,
    marginTop: 514,
    backgroundColor: '#3D4AE7', 
    borderRadius: 4, 
    overflow: 'hidden',
  },
  primary: {
    width: 336,
    height: 42,
    marginLeft: 12,
    marginTop: 566,
    backgroundColor: '#3D4AE7',
    borderRadius: 4,
  },
  
});

export default SignUpFirstScreen;
