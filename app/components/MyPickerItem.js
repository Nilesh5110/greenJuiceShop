import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MyText from "../components/MyText";

function MyPickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MyText style={styles.txtStyles} label={label} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containar: {},
  txtStyles: {
    padding: 20,
    fontSize: 20,
  },
});

export default MyPickerItem;
