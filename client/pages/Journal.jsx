import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class Journal extends Component {
  render() {
    return (
      <View>
        <Text> Journal Screen </Text>
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
