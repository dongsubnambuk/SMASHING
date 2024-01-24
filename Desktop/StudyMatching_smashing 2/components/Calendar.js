import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { Entypo } from '@expo/vector-icons';

export default function Calendar1({ navigation }) {
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
          <Text style={{fontSize: 18, fontWeight: '600', color: '#FFB800'}}>
            2
          </Text>
        </View>
        <View style={styles.scheduleName}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>
            리액트 스터디
          </Text>
        </View>
        <View style={styles.scheduleInfo}>
          <Entypo name="triangle-right" size={60} color="#FFFAEE" />
        </View>
      </View>
      <View style={{...styles.schedule, backgroundColor: '#FFD9D9'}}>
        <View style={styles.scheduleDate}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#FF0000'}}>
            4
          </Text>
        </View>
        <View style={styles.scheduleName}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>
            엑스포 스터디
          </Text>
        </View>
        <View style={styles.scheduleInfo}>
          <Entypo name="triangle-right" size={60} color="#FFFAEE" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height:"100%"
  },
  scheduleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#3D4AE7',
    borderRadius: 10,
  },
  scheduleContainerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  calendar: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: '90%',
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 10, // 그림자
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFE6A8',
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleDate: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFAEE',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleName: {
    paddingVertical: 10,
    paddingHorizontal: 80,
    backgroundColor: '#FFFAEE',
    borderRadius: 13,
    justifyContent: 'center',
  },
  scheduleInfo: {
    marginTop: -2,
    marginHorizontal: -13,
  },
  /*  subHeader: { 
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 80,
  } */
});