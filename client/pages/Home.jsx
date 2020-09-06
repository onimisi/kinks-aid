import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { ScreenContainer } from "react-native-screens";

export default class Home extends Component {
  render() {

    return (
      <View>
        <Text>Home</Text>
        <Button title="Scan History" onPress={() => this.props.navigation.navigate('ScanHistory')}/>
        <Button title="Journal" onPress={() => this.props.navigation.navigate('Journal')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
