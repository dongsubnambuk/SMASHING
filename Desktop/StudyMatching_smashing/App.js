// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import Studyplusbtn from './components/Studyserachbtn';


export default function App() {
  return (
    <View style={styles.container}>
      <BottomTabNavigationApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
});
