import React from 'react';
import { TouchableWithoutFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class Studyplusbtn extends React.Component {
  render() {
    const screenWidth = Dimensions.get('window').width;

    // 반응형 디자인을 위한 동적 스타일
    const buttonStyle = {
      position: 'absolute',
      top: '6.5%',
      left: '84%',
      alignItems: 'center',
      justifyContent: 'center',
    };

    //터치 피드백 없앰: 버튼 모양? 없앰.
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}> 
        <Icon name="plus" size={40} color="#3D4AE7" style={buttonStyle} />
      </TouchableWithoutFeedback>
    );
  }
}

export default Studyplusbtn;
