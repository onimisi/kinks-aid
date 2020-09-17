import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import RowProduct from '../components/RowProduct'
import { format } from "date-fns";
import axios from 'axios';

const formatDate = (date = new Date()) => format(date, "yyyy-MM-dd");

const getMarkedDates = (dateString, appointments) => {
  const markedDates = {};
  // console.log(appointments);
  markedDates[formatDate(dateString)] = { selected: true };

  appointments.forEach((appointment) => {
    const formattedDate = formatDate(new Date(appointment.data.date));
    markedDates[formattedDate] = {
      ...markedDates[formattedDate],
      marked: true,
    };
  });

  return markedDates;
};

const setNewDate = ( year, month, day ) => new Date( year, month-1, day)

function Home({ navigation }) {
  const [selectDay, setSelectDay] = useState(new Date());
  const [treatments, setTreatments] = useState([]);
  const [scans, setScans] = useState([])

  useEffect(() => {
    axios
      .get(`https://capstone-kinksaid.web.app/api/v1/event/oukanah`)
      .then((res) => {
        // console.log("RESPONSE:", res.data);
        setTreatments(res.data);
        getMarkedDates(selectDay, res.data);
      })
      .catch((err) => console.log(err));

    axios
    .get(`https://capstone-kinksaid.web.app/api/v1/results/QhiScQ1h5FXWEoBEOlqEFNPQClq1`)
    .then(res => {
      // console.log(res.data.data.element);
      setScans(res.data.data.element.reverse())
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.goToPage}>
          <Text
            style={styles.subHeader}
            onPress={() => navigation.navigate("ScanHistory", {
              products: scans
            })}>
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
        {
          scans &&
          scans.slice(0,3).map((history, index) => {
            {/* console.log(history) */}
            return <RowProduct key={index} product={history} />
          })
        }
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
          onDayPress={({ day, month, year}) => {
            const newBase = setNewDate( year, month, day)
            setSelectDay(newBase);
            getMarkedDates(newBase, treatments);
            navigation.navigate("Journal", {
              year,
              month,
              day
            })
          }}
          markedDates={getMarkedDates(selectDay, treatments)}
        />
      </View>
    </ScrollView>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#94675B",
    borderTopWidth: 2,
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
