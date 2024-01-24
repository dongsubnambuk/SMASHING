import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  return (
    <View style={styles.ScreenText}>
      <Text>마이 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenText: {
    top: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
