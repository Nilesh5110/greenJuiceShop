import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import MyText from "../components/MyText";

function MyItemLabel({ itemName, img, onPress, style, imgstylesFromOutSide }) {
  
  return (
    <TouchableOpacity onPress={onPress} style={[styles.containar, style]}>
      <Image
        style={[styles.imgStyles, imgstylesFromOutSide]}
        source={{ uri: img }}
      />
      <MyText style={styles.txtStyles} label={itemName} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containar: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingVertical: 25,
    marginHorizontal: 20,
  },
  imgStyles: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  txtStyles: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default MyItemLabel;
