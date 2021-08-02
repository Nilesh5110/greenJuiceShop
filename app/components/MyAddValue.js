import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Insert_Main_Variety } from "../helper/db";

import MyIcon from "./MyIcon";
import MyImagePicker from "./MyImagePicker";
import MyTextInput from "./MyTextInput";

function MyAddValue({ style, cupPrice = false, onPress, setItems }) {
  const [imageUri, setImageUri] = useState();
  const [mainVarietyName, setMainVarietyName] = useState();
  const [l_CupPrice, setL_CupPrice] = useState();
  const [m_CupPrice, setM_CupPrice] = useState();

  return (
    <View style={[styles.containar, style]}>
      <MyTextInput
        placeholder="Add new item..."
        onChangeText={(text) => setMainVarietyName(text)}
        style={styles.inputStyles}
      />
      {cupPrice && (
        <MyTextInput
          style={styles.cupSizeStyles}
          placeholder="$ L"
          onChangeText={(text) => setL_CupPrice(text)}
          keyboardType="numeric"
        />
      )}

      {cupPrice && (
        <MyTextInput
          style={styles.cupSizeStyles}
          placeholder="$ M"
          onChangeText={(text) => setM_CupPrice(text)}
          keyboardType="numeric"
        />
      )}
      <MyImagePicker
        imageUri={imageUri}
        onChangeImage={(uri) => setImageUri(uri)}
      />
      <MyIcon
        name="plus-circle-outline"
        backgroundColor="#fff"
        iconColor="#000"
        size={60}
        touchAble={true}
        onPress={() => {
          setItems({
            itemname: mainVarietyName,
            img: imageUri,
            L_Cup: l_CupPrice,
            M_Cup: m_CupPrice,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  inputStyles: {
    width: "50%",
    height: "100%",
    fontSize: 30,
  },
  cupSizeStyles: {
    width: 50,
  },
});

export default MyAddValue;
