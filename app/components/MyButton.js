import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";

import Colors from "../config/Colors";
import MyText from "../components/MyText";

let TouchableCmp = View;

const { width, height } = Dimensions.get("window");

function MyButton({
  label,
  width = 200,
  height = 50,
  color = "opium",
  onPress,
  style,
  labelStyles,
  iconName,
  iconFeather,
  iconColor,
  touchAble = true,
}) {
  if (touchAble === true) {
    TouchableCmp = TouchableOpacity;
  } else {
    TouchableCmp = View;
  }
  return (
    <TouchableCmp
      style={[
        styles.containar,
        { backgroundColor: Colors[color] },
        { width: width },
        { height: height },
        style,
      ]}
      onPress={onPress}
    >
      {iconName && (
        <MaterialCommunityIcons
          style={styles.iconStyles}
          color={iconColor}
          size={30}
          name={iconName}
        />
      )}

      {label && (
        <MyText
          style={[styles.txtLabelStyles, { ...labelStyles }]}
          label={label}
        />
      )}
    </TouchableCmp>
  );
}

const styles = StyleSheet.create({
  containar: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  iconStyles: {
    marginRight: 10,
  },
  txtLabelStyles: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default MyButton;
