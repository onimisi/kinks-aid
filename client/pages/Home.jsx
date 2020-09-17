import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import RowProduct from '../components/RowProduct'
import { format } from "date-fns";
import axios from 'axios';
import { screen, text } from '../styles/GlobalStyles';

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
  const [scans, setScans] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getTreatmentEvents();
      getScanResults();
    }, [])
  );

  // useEffect(() => {
    
  // }, []);

  const getTreatmentEvents = () => {
    axios
    .get(`https://capstone-kinksaid.web.app/api/v1/event/oukanah`)
    .then((res) => {
      // console.log("RESPONSE:", res.data);
      setTreatments(res.data);
      getMarkedDates(selectDay, res.data);
    })
    .catch((err) => console.log(err));
  }

  const getScanResults = () => {
    axios
    .get(`https://capstone-kinksaid.web.app/api/v1/results/QhiScQ1h5FXWEoBEOlqEFNPQClq1`)
    .then(res => {
      // console.log(res.data.data.element);
      setScans(res.data.data.element.reverse())
    })
    .catch(err => console.log(err))
  }

  return (
    <ScrollView style={screen.container}>
        <View style={styles.goToPage}>
          <Text
            style={[text.header, styles.gotToHeader]}
            onPress={() => navigation.navigate("ScanHistory", {
              products: scans
            })}>
            Scan History
          </Text>
          <Ionicons
            style={styles.arrowIcon}
            name='ios-arrow-forward'
            size={23}
            color='#7d2a42'
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
            style={text.header}
            onPress={() => navigation.navigate("Journal")}
            >
            Journal
          </Text>
          <Ionicons
            style={styles.arrowIcon}
            name='ios-arrow-forward'
            size={23}
            color='#7d2a42'
          />
        </View>
        <Calendar
          current={formatDate(selectDay)}
          enableSwipeMonths={true}
          style={styles.calendar}
          theme={{
            textDisabledColor: "lightgrey",
            dayTextColor: "black",
            arrowColor: "#7d2a42",
            selectedDayBackgroundColor: '#ffdccc',
            selectedDayTextColor: '#7d2a42',
            dotColor: '#fb6376',
            selectedDotColor: '#fb6376',
          }}
          onDayPress={({ day, month, year}) => {
            const newBase = setNewDate( year, month, day)
            setSelectDay(newBase);
            getMarkedDates(newBase, treatments);
          }}
          markedDates={getMarkedDates(selectDay, treatments)}
        />
    </ScrollView>
  );
}
export default Home;

const styles = StyleSheet.create({
  goToPage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#7d2a42',
  },
  gotToHeader:{
    marginBottom: 8,
  },
  scanHistoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  arrowIcon: {
    marginTop: 7,
    marginBottom: 8
  },
  calendar: {
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 5,
  },
});
