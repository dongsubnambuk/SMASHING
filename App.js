// App.js
import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import MypageScreen from './screens/MypageScreen';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const handlePlusButton = () => {
    // 버튼이 눌렸을 때 수행할 동작 추가
  };

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'white',
        },
      }}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Image style={styles.headerImage} source={require('./assets/header.png')} />
          <TouchableOpacity onPress={handlePlusButton} style={styles.plusButton}>
            <Entypo name="plus" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Stack.Navigator screenOptions={{
        headerMode: 'none', // 상단의 뒤로가기 버튼 및 헤더 삭제
      }} initialRouteName="BottomTabNavigationApp">
        <Stack.Screen
          name="BottomTabNavigationApp"
          component={BottomTabNavigationApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MypageScreen"
          component={MypageScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 200,
    height: 23.4,
  },
  button: {
    marginLeft: 'auto', // 오른쪽으로 이동
    backgroundColor: '#3D4AE7',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  plusButton: {
    marginLeft: 10,
  }
});

export default App;
