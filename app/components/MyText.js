import React from "react";
import { View, StyleSheet, Text } from "react-native";

function MyText({ label, style }) {
  return <Text style={[styles.txtLabel, style]}>{label}</Text>;
}

const styles = StyleSheet.create({
  txtLabel: {
    fontFamily: "ubuntu-regular",
  },
});

export default MyText;
