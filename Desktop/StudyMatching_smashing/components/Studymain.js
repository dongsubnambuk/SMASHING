// Studymain.js
import { Button } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const Studymain = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMASHING</Text>
      <Text style={styles.mystudy}>내 스터디</Text>
      <Text style={styles.mystudy_under}>대충 있어 보이는 말</Text>
      <Text style={styles.wantstudy}>원하는 스터디를 찾으세요!</Text>
      
      <Image source={require('../assets/studymain.png')} style={styles.image} />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    height:"100%",
  },
  title: {
    fontFamily: 'Ultra',
    top:"5%",
    marginLeft:"5%",
    fontSize: 40,
    color:"#3D4AE7",
    fontWeight:"bold"
   
  },
  mystudy:{
    top:"6%",
    marginLeft:"5%",
    fontSize:30,
    fontWeight:"bold"
  },
  mystudy_under:{
    top:"7%",
    marginLeft:"5%",
    fontSize:20,
   
   
  },
  wantstudy: {
     marginLeft:"18%",
     top:"50%",
     fontSize:30,
     fontWeight:"bold"
  },
  image: {
    marginLeft:"25%",
    top:"20%",
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default Studymain;
