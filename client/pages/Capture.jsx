import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class Capture extends Component {
  render() {
    return (
      <View>
        <Text> Capture Screen </Text>
        <Button title="Results" onPress={() => this.props.navigation.navigate('Results')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
