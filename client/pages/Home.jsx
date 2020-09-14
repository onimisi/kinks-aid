import React, { Component, useState } from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { format } from "date-fns";

const formatDate = (date = new Date()) => format(date, "yyyy-MM-dd");

const getMarkedDates = (dateString, appointments) => {
  const markedDates = {};

  markedDates[formatDate(dateString)] = { selected: true };

  appointments.forEach((appointment) => {
    const formattedDate = formatDate(new Date(appointment.date));
    markedDates[formattedDate] = {
      ...markedDates[formattedDate],
      marked: true,
    };
  });

  return markedDates;
};

const setNewDate = ( year, month, day ) => new Date( year, month-1, day)

function Home({ navigation }) {
  const [selectDay, setSelectDay] = useState(new Date())

  const APPOINTMENTS = [
    {
      date: "2020-09-13T05:00:00.000Z",
      title: "It's a past thing!",
    },
    {
      date: "2020-09-15T05:00:00.000Z",
      title: "It's a today thing!",
    },
    {
      date: "2020-09-18T05:00:00.000Z",
      title: "It's a future thing!",
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.goToPage}>
          <Text
            style={styles.subHeader}
            onPress={() => navigation.navigate("ScanHistory")}>
            Scan History
          </Text>
          <Ionicons
            style={styles.arrowIcon}
            name='ios-arrow-forward'
            size={22}
            color='#882C2E'
          />
        </View>
        <View style={styles.scanHistoryContainer}>
          <View>
            <Image
              style={styles.scan}
              source={{
                uri:
                  "https://static.dribbble.com/users/2272349/screenshots/11207743/media/2b75c8253c5485936d05894abc9e4b4d.jpg",
              }}
            />
            <Text>Product 1</Text>
          </View>
          <View>
            <Image
              style={styles.scan}
              source={{
                uri:
                  "https://3.bp.blogspot.com/-IdfbE8yIPO0/XVwTj9xtuJI/AAAAAAAGIA0/CkWQCaoKAXow4m2a1jaBbKURURT439HzwCLcBGAs/s1600/orea_1.jpg",
              }}
            />
            <Text>Product 2</Text>
          </View>
          <View>
            <Image
              style={styles.scan}
              source={{
                uri:
                  "https://designhooks.com/wp-content/uploads/2018/05/shampoo-bottle-packging-mockup.jpg",
              }}
            />
            <Text>Product 3</Text>
          </View>
        </View>

        <View style={styles.goToPage}>
          <Text
            style={styles.subHeader}
            onPress={() => navigation.navigate("Journal")}
            >
            Journal
          </Text>
          <Ionicons
            style={styles.arrowIcon}
            name='ios-arrow-forward'
            size={22}
            color='#882C2E'
          />
        </View>
        <Calendar
          current={formatDate(selectDay)}
          enableSwipeMonths={true}
          style={styles.calendar}
          theme={{
            backgroundColor: "#E7E6F2",
            calendarBackground: "#E7E6E9",
            textDisabledColor: "lightgrey",
            dayTextColor: "black",
            arrowColor: "#882C2E",
            selectedDayBackgroundColor: '#C0D6DF',
            selectedDayTextColor: '#166088',
          }}
          // onDayPress={(date) => navigation.navigate("Journal", {
          //   datePassed: date
          // })}
          
          // onDayPress={({ dateString }) => getMarkedDates(dateString, APPOINTMENTS) }
          onDayPress={({ day, month, year}) => {
            const newBase = setNewDate( year, month, day)
            setSelectDay(newBase);
            getMarkedDates(newBase, APPOINTMENTS);
            navigation.navigate("Journal", {
              year,
              month,
              day
            })
          }}
          markedDates={getMarkedDates(selectDay, APPOINTMENTS)}
        />
      </View>
    </ScrollView>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#94675B",
    borderTopWidth: 1,
  },
  mainView: {
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  goToPage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  scan: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  scanHistoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 25,
    marginRight: 15,
    fontFamily: "montserrat-regular",
  },
  arrowIcon: {
    marginTop: 5,
  },
  calendar: {
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 20,
  },
});
