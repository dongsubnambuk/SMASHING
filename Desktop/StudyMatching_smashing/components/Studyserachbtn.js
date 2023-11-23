import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const Studyserachbtn = ({ onPress }) => {
  const screenWidth = Dimensions.get('window').width;

  // 반응형 디자인을 위한 동적 스타일
  const buttonStyle = {
    position: 'absolute',
    width:110,
    top: "70%",
    left: '37%',
    backgroundColor: '#3D4AE7',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center'
  };


  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={{ color: '#fff', textAlign: 'center' ,fontSize:18, fontWeight:"bold"}}>스터디 찾기</Text>
    </TouchableOpacity>
  );
};

export default Studyserachbtn;
