import React, { Component, useState } from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { ScreenContainer } from "react-native-screens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";

function Home(props) {
  const [markedDates, setMarkedDates] = useState({});

  const markDate = (dateString) => {
    setMarkedDates(
      (markedDates[dateString] = {
        selected: true,
        selectedColor: "red",
      })
    );

    console.log(markedDates);
  };
  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.goToPage}>
          <Text
            style={styles.subHeader}
            onPress={() => props.navigation.navigate("ScanHistory")}>
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
            onPress={() => props.navigation.navigate("Journal")}>
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
          enableSwipeMonths={true}
          style={styles.calendar}
          theme={{
            backgroundColor: "#E7E6F2",
            calendarBackground: "#E7E6E9",
            textDisabledColor: "lightgrey",
            dayTextColor: "black",
            arrowColor: "#882C2E",
            selectedDayBackgroundColor: "#FFFFFF",
            selectedDayTextColor: "#ffffff",
          }}
          onDayPress={({ dateString }) => markDate(dateString)}
          markedDates={markedDates}
        />
      </View>
    </ScrollView>
  );
}
export default Home;

const styles = StyleSheet.create({
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
    height: 310,
    marginTop: 20,
  },
});
