// Studyserachbtn.js
import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Studyserachbtn = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const buttonStyle = {
    position: 'absolute',
    width: 110,
    top: '63%',
    left: '37%',
    backgroundColor: '#3D4AE7',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  };

  const handlePress = () => {
    navigation.navigate('StudyList');
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={handlePress}>
      <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        스터디 찾기
      </Text>
    </TouchableOpacity>
  );
};

export default Studyserachbtn;
