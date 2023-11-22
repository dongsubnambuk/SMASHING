// Studymain.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Studymain = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>smashing</Text>
      <Image source={require('../assets/studymain.png')} style={styles.image} />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
   
  
  },
  image: {
    width: 300, 
    height: 200,
    top:380,
    resizeMode:"contain"
  },

});

export default Studymain;
