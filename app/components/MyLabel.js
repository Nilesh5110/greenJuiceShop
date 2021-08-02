import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyText from "./MyText";
import MyIcon from "./MyIcon";

function MyLabel({
  size = 60,
  label,
  style,
  color,
  price,
  name,
  cupSize,
  onPress,
}) {
  return (
    <View style={[styles.containar, style]}>
      <MyText style={[styles.txtLabel, style]} label={label} />
      <MyText style={[styles.txtPrice, style]} label={cupSize} />
      <MyText style={[styles.txtPrice, style]} label={price} />
      <TouchableOpacity onPress={onPress}>
        <MyIcon
          name={name}
          size={size}
          iconColor="#8d8c8c"
          backgroundColor="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  txtLabel: {
    width: "50%",
    fontSize: 25,
    textAlign: "center",
    alignSelf: "center",
  },
  txtPrice: {
    fontSize: 25,
    width: "15%",
  },
});

export default MyLabel;
