import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

export default function CalendarScreen({ navigation }) {
  const posts = [
    {
      id: 1,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2024-01-26',
    },
    {
      id: 2,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2024-01-27',
    },
  ];

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = { marked: true };
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
      <View style={styles.subHeader}>
        <Text style={{fontSize: 20, fontWeight: '900'}}>
          나의 일정
        </Text>
        <Text style={{fontSize: 10, fontWeight: "500"}}>
          소중한 기록들...
        </Text>
      </View>
      <Calendar
        style={styles.calendar}
        markedDates={markedSelectedDates}
        theme={{
          selectedDayBackgroundColor: '#009688',
          arrowColor: '#009688',
          dotColor: '#009688',
          todayTextColor: '#009688',
        }}
        onDayPress={(day) => {
          setSelectedDate(new Date(day.dateString));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey"
  },
  calendar: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
    paddingVertical: 10,
    borderRadius: 10,
  },
  subHeader: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 80,
  }
});
