import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import RadioForm from "react-native-simple-radio-button";

function MyRadioButton({ L_Price = "8", M_Price = "5", cupSize }) {
  const [value, setValue] = useState("L");

  const PROP = [
    {
      key: "L",
      text: "L",
      price: `$${L_Price}`,
    },
    {
      key: "M",
      text: "M",
      price: `$${M_Price}`,
    },
  ];

  cupSize(value);

  return (
    <View style={styles.container}>
      {PROP.map((res) => {
        return (
          <View key={res.key} style={styles.mainViewStyles}>
            <Text style={styles.radioText}>{res.text}</Text>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => {
                setValue(res.key);
              }}
            >
              {value === res.key && <View style={styles.selectedRb} />}
            </TouchableOpacity>
            <Text style={styles.radioText}>{res.price}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  mainViewStyles: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
  },
  radioCircle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#3740ff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "red",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});

export default MyRadioButton;
