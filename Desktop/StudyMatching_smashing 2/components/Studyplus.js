// Studyplus.js
import { Button } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const Studyplus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMASHING</Text>
      <Text style={styles.mystudy}>모임 만들기</Text>
      <Text style={styles.mystudy_under}>대충 있어 보이는 말</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    height:"100%",
  },
  title: {

    top:"5%",
    marginLeft:"5%",
    fontSize: 35,
    color:"#3D4AE7",
    fontWeight:"bold"
   
  },
  mystudy:{
    top:"7%",
    marginLeft:"5%",
    fontSize:28,
    fontWeight:"bold"
  },
  mystudy_under:{
    top:"8%",
    marginLeft:"5%",
    fontSize:20,
   
   
  },
});

export default Studyplus;
