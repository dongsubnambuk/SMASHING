// App.js
import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigationApp from './components/BottomTabNavigationApp';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import MypageScreen from './screens/MypageScreen';
import MapScreen from './screens/MapScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const handlePlusButton = () => {
    // 버튼이 눌렸을 때 수행할 동작 추가
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}>
        <View>
          <StatusBar />
        </View>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <Image style={styles.headerImage} source={require('./assets/header.png')} />
            <TouchableOpacity onPress={handlePlusButton} style={styles.plusButton}>
              <Entypo name="plus" size={windowWidth * 0.07} color="black" />
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
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.02,
  },
  headerImage: {
    width: windowWidth * 0.51,
    height: windowHeight * 0.03,
  },
  plusButton: { 
  }
});

export default App;
