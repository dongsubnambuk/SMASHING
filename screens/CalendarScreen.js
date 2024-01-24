import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { Entypo } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CalendarScreen({ navigation }) {
  const posts = [
    {
      id: 1,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2024-01-02',
      color: '#FFB800',
    },
    {
      id: 2,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2024-01-04',
      color: '#FF0000',
    },
  ];

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = { marked: true, dotColor: current.color };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(new Date());
  const markedSelectedDates = {
    ...markedDates,
    [format(selectedDate, 'yyyy-MM-dd')]: {
      selected: true,
      marked: markedDates[format(selectedDate, 'yyyy-MM-dd')]?.marked || false,
    },
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={markedSelectedDates}
        theme={{
          selectedDayBackgroundColor: '#009688',
          arrowColor: '#009688',
          dotColor: 'red',
          todayTextColor: '#009688',
        }}
        onDayPress={(day) => {
          setSelectedDate(new Date(day.dateString));
        }}
      />
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleContainerText}>
          This Month's Study Schedule
        </Text>
      </View>
      <View style={styles.schedule}>
        <View style={styles.scheduleDate}>
          <Text style={{fontSize: windowWidth * 0.05, fontWeight: '600', color: '#FFB800'}}>
            2
          </Text>
        </View>
        <View style={styles.scheduleName}>
          <Text style={{fontSize: windowWidth * 0.042, fontWeight: '600'}}>
            리액트 스터디
          </Text>
        </View>
        <View style={styles.scheduleInfo}>
          <Entypo name="triangle-right" size={windowWidth * 0.145} color="#FFFAEE" />
        </View>
      </View>
      <View style={{...styles.schedule, backgroundColor: '#FFD9D9'}}>
        <View style={styles.scheduleDate}>
          <Text style={{fontSize: windowWidth * 0.05, fontWeight: '600', color: '#FF0000'}}>
            4
          </Text>
        </View>
        <View style={styles.scheduleName}>
          <Text style={{fontSize: windowWidth * 0.042, fontWeight: '600'}}>
            엑스포 스터디
          </Text>
        </View>
        <View style={styles.scheduleInfo}>
          <Entypo name="triangle-right" size={windowWidth * 0.145} color="#FFFAEE" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scheduleContainer: {
    alignItems: 'center',
    paddingVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.05,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
  },
  scheduleContainerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  calendar: {
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.015,
    width: windowWidth * 0.9,
    paddingVertical: windowHeight * 0.012,
    borderRadius: 15,
    elevation: 10, // 그림자
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFE6A8',
    marginTop: windowHeight * 0.012,
    marginHorizontal: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.02,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleDate: {
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    backgroundColor: '#FFFAEE',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleName: {
    paddingVertical: windowHeight * 0.012,
    paddingHorizontal: windowWidth * 0.2,
    backgroundColor: '#FFFAEE',
    borderRadius: 13,
    justifyContent: 'center',
  },
  scheduleInfo: {
    marginHorizontal: windowWidth * -0.035, // 아이콘 배경이 커서 조절
  },
});