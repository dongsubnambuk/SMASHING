import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.ScreenText}>
      <Text>게시판</Text>
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
