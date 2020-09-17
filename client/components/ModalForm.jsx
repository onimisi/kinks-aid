import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class ModalForm extends Component {
  state = {
    textInput: [],
    inputData: [],
    notes: "",
  };

  //function to add TextInput dynamically
  addTextInput = (index) => {
    if(index === 5) return
    let textInput = this.state.textInput;
    textInput.push(
      <TextInput
        placeholder='Treatment'
        key={index}
        style={styles.textInput}
        onChangeText={(text) => this.addValues(text, index)}
      />
    );
    this.setState({ textInput });
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput, inputData });
  };

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({ text: text, index: index });
      this.setState({
        inputData: dataArray,
      });
    }
  };

  //function to console the output
  getValues = () => {
    this.props.submitData(this.state.inputData, this.state.notes);
    this.props.closeModal();
  };

  render() {
    return (
    //   <DismissKeyboard>
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            placeholder='Date'
            value={this.props.date}
            autoCapitalize='none'
            editable={false}
          />
          <View style={styles.row}>
            <View style={{ margin: 10 }}>
              <Button
                title='+'
                onPress={() => this.addTextInput(this.state.textInput.length)}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button title='-' onPress={() => this.removeTextInput()} />
            </View>
          </View>
          {this.state.textInput.map((value) => {
            return value;
          })}
          <View>
            <Text>Notes:</Text>
            <TextInput
              style={styles.textarea}
              placeholder='Additional Notes'
              value={this.state.notes}
              onChangeText={(notes) => this.setState({ notes })}
              autoCapitalize='none'
              multiline={true}
            />
          </View>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              this.getValues();
            }}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#FF000070" }}
            onPress={() => {
              this.props.closeModal();
            }}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
    //   </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // buttonView: {
  // flexDirection: 'row'
  // },
  inputBox: {
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#00000020",
    color: "#00000050",
  },
  textInput: {
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    // backgroundColor: "#00000020",
    color: "#00000050",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textarea: {
    margin: 10,
    padding: 20,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 20,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    // width: "80%",
    margin: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalForm;
