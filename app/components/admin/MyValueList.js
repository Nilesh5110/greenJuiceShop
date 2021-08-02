import React, { useState } from "react";
import { View, StyleSheet, Switch, Image } from "react-native";
import MyText from "../MyText";
import MyIcon from "../MyIcon";

function MyValueList({ label, imageUri, onPress, value, newValue }) {
  const [switchOn, setSwitchOn] = useState(Boolean(value));

  const updateStatus = (status) => {
    setSwitchOn(status);
    newValue(status);
  };

  return (
    <View style={styles.containar}>
      <View style={styles.lableViewStyles}>
        <Image source={{ uri: imageUri }} style={styles.imgStyles} />
        <MyText style={styles.txtStyles} label={label} />
      </View>
      <View style={styles.closeViewStyles}>
        <Switch
          value={switchOn}
          onValueChange={(value) => updateStatus(value)}
        />

        <MyIcon
          name="delete"
          backgroundColor="#fff"
          size={50}
          iconColor="#000"
          touchAble={true}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
  },
  lableViewStyles: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  txtStyles: {
    fontSize: 30,
    marginLeft: 10,
  },
  closeViewStyles: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgStyles: {
    height: 50,
    width: 50,
  },
});

export default MyValueList;
