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
        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
        <Text style={styles.buttonText1}>회원가입</Text>
      </TouchableOpacity>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // marginLeft: 20, // Use appropriate values for margin
   top:"40%",
   alignItems: 'center',
  },
  smasing: {
    fontSize: 50,
    color: '#3D4AE7',
    fontFamily: 'Ultra',
    lineHeight: 54,
     alignItems: 'center',
     fontWeight: 'bold',
  },
  studyDescription: {
    fontSize: 18,
    color: '#3D4AE7',
    letterSpacing: 0.02,
    lineHeight: 24, // Use appropriate values for lineHeight
  },
  buttonContainer: {
    top:"27%",
   width:"90%"
  },
  secondaryButton: {
  
    height: 50,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderColor: '#3d4ae7',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    marginTop: 20, // Use appropriate values for margin
    
    height: 50,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#3D4AE7',
    fontSize: 20, 
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
  },
});

export default SignUpFirstScreen;
