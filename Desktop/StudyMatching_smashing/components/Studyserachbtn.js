import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const Studyserachbtn = ({ onPress }) => {
  const screenWidth = Dimensions.get('window').width;

  // 반응형 디자인을 위한 동적 스타일
  const buttonStyle = {
    position: 'absolute',
    borderRadius:40,
    top: 550,
    left: '40%',
    backgroundColor: '#3D4AE7',
    padding: 10,
    borderRadius: 5,
  };


  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={{ color: '#fff' }}>스터디 찾기</Text>
    </TouchableOpacity>
  );
};

export default Studyserachbtn;
