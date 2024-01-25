import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MypageScreen = () => {
  return (
    <View style={styles.ScreenText}>
      <Text>마이 페이지</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  ScreenText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MypageScreen;
