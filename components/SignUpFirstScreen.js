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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
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
    marginLeft: 20, // Use appropriate values for margin
    marginTop: 50, // Use appropriate values for margin
  },
  smasing: {
    fontSize: 50,
    color: '#3D4AE7',
    // fontFamily: 'Ultra',
    lineHeight: 54,
  },
  studyDescription: {
    fontSize: 18,
    color: '#3D4AE7',
    letterSpacing: 0.02,
    lineHeight: 24, // Use appropriate values for lineHeight
  },
  buttonContainer: {
    marginTop: 20, // Use appropriate values for margin
  },
  secondaryButton: {
    width: 360,
    height: 42,
    backgroundColor: '#3D4AE7',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    marginTop: 20, // Use appropriate values for margin
    width: 336,
    height: 42,
    backgroundColor: '#3D4AE7',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // Use appropriate values for fontSize
  },
});

export default SignUpFirstScreen;
