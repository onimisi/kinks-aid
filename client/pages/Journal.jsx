import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import MyModal from "../components/MyModal";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const formatDate = (date = new Date()) => format(date, "yyyy-MM-dd");

const Journal = ({ route }) => {
  const [selectedDay, setSelectedDay] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [dayDetails, setDayDetails] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [marked, setMarked] = useState({})

  useEffect(() => {
    console.log("reload")
    axios
      .get(`https://capstone-kinksaid.web.app/api/v1/event/oukanah`)
      .then((res) => {
        // console.log("RESPONSE:", res.data);
        setTreatments(res.data);
        getMarkedDates(selectedDay, res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getMarkedDates = (dateString, appointments) => {
    const markedDates = {};
    console.log(dateString);

    markedDates[formatDate(dateString)] = { selected: true };
  
    appointments.forEach((appointment) => {
      const formattedDate = formatDate(new Date(appointment.data.date));
      markedDates[formattedDate] = {
        ...markedDates[formattedDate],
        marked: true,
      };
    });

    // getDayDetails(dateString)
      // setMarked(markedDates)
      // console.log("MARKED DATES:", marked);
    return markedDates;
  };

  const getDayDetails = (date) => {
    const details = treatments.find(
      (treatment) =>
        formatDate(new Date(treatment.data.date)) === formatDate(date)
    );
    if (details) {
      setDayDetails(details);
      setShowDetails(false);
    } else {
      setDayDetails(undefined);
      setShowDetails(true);
    }
  };

  if (route.params !== undefined && !selectedDay) {
    const { year, month, day } = route.params;
    const newBase = new Date (year, (month-1), day);
    setSelectedDay(newBase);
    console.log(year, month, day);
  }

  return (
    <ScrollView style={styles.pageContainer}>
      <Calendar
        current={formatDate(selectedDay)}
        enableSwipeMonths={true}
        style={styles.calendar}
        theme={{
          backgroundColor: "#E7E6F2",
          calendarBackground: "#E7E6E9",
          textDisabledColor: "lightgrey",
          dayTextColor: "black",
          arrowColor: "#882C2E",
          selectedDayBackgroundColor: "#C0D6DF",
          selectedDayTextColor: "#166088",
        }}
        onDayPress={({ day, month, year }) => {
          const newBase = new Date (year, (month-1), day);
          setSelectedDay(newBase);
          getMarkedDates(newBase, treatments);
          getDayDetails(newBase);
        }}
        markedDates={getMarkedDates(selectedDay, treatments)}
      />
      {showDetails && (
        <MyModal date={format(selectedDay, "dd-MM-yyyy")} day={selectedDay} />
      )}
      <View>
        {dayDetails && (
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginVertical: 20,
              }}>
              {dayDetails.data.treatments.map((treatment, index) => (
                <View
                  style={{
                    backgroundColor: "#FFC0CB80",
                    // borderColor: "#882C2E",
                    borderRadius: 8,
                    borderWidth: 1,
                    padding: 4,
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 5
                  }}>
                  <Text
                    style={{
                      fontFamily: "montserrat-regular",
                      marginRight: 20,
                    }}
                    key={`${index}-${treatment.text}`}>
                    {treatment.text}
                  </Text>
                  <Ionicons
                    name='ios-close-circle-outline'
                    size={24}
                    color='black'
                  />
                </View>
              ))}
            </View>
            <Text style={{ fontFamily: "montserrat-light", fontSize: 20 }}>Notes:</Text>
            <View
              style={{
                padding: 20,
                fontSize: 16,
                borderColor: "#882C2E",
                backgroundColor: "#fff",
                height: 150,
                borderWidth: 1,
                borderRadius: 10,
                paddingTop: 20,
              }}>
              <Text style={{ fontFamily: "montserrat-regular", fontSize: 16 }}>
                {dayDetails.data.notes}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    borderTopColor: "#94675B",
    borderTopWidth: 1,
    flex: 1,
    padding: 25,
    backgroundColor: "#E7E6E9",
  },
  calendar: {
    borderRadius: 10,
    borderColor: "gray",
    width: "100%",
  },
});

export default Journal;
