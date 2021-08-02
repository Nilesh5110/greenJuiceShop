import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
function MyIcon({
  name,
  size = 40, // default value set kari che .... jya use kariye tya value na aape to aa value se thase
  backgroundColor = "#000",
  iconColor = "#fff",
  style,
  touchAble,
  onPress,
}) {
  if (touchAble === true) {
    TouchableCmp = TouchableOpacity;
  } else {
    TouchableCmp = View;
  }
  return (
    <TouchableCmp
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={name}
        color={iconColor}
        backgroundColor={backgroundColor}
        size={size * 0.5}
      />
    </TouchableCmp>
  );
}

export default MyIcon;
