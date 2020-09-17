import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import firebaseConfigured from '../firebase'
import ModalForm from "./ModalForm";
import axios from "axios";

export default function MyModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const currUser = firebaseConfigured.auth().currentUser;

  const submitData = async (dataPassedUp, notes) => {
    await axios({
      url: "https://capstone-kinksaid.web.app/api/v1/event",
      method: "POST",
      data: {
        date: props.day,
        treatments: dataPassedUp,
        userId: "oukanah",
        notes,
      },
    });

    props.events();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Treatments</Text>
            <ModalForm
              date={props.date}
              closeModal={closeModal}
              submitData={submitData}
            />
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>+ Add Treatments</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 52,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  openButton: {
    backgroundColor: "#c2b280",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "70%",
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 40,
  },
});
