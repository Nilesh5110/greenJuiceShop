import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../config/Colors";

function MyTextInputFancy({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.containar, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={Colors.medium}
          style={styles.iconStyles}
        />
      )}
      <TextInput style={styles.txtInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    backgroundColor: Colors.txtDark,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  txtInput: {
    fontSize: 18,
    width: "95%",
    color: Colors.dark,
  },
  iconStyles: {
    marginRight: 10,
  },
});

export default MyTextInputFancy;
