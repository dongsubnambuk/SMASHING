import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  title: {
    fontFamily:'Ultra',
    fontSize: 25,
    paddingHorizontal: 10,
  },
});
