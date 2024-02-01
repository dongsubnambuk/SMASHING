// NextPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NextPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>다음 페이지의 내용</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NextPage;
