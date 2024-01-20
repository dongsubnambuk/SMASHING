import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.ScreenText}>
      <Text>마이 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenText: {
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
