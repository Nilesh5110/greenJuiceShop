import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyTextInput from "../components/MyTextInput";
import MyMenuItems from "../components/MyMenuItems";
import MyIcon from "./MyIcon";

function MySearchItem({ navigation }) {
  return (
    <View style={styles.containar}>
      <View style={styles.mainViewStyles}>
        <MyIcon
          name="view-headline"
          backgroundColor="#fff"
          iconColor="#000"
          touchAble={true}
          size={50}
          onPress={navigation.openDrawer}
        />
        <MyTextInput
          ioniconsIcon="search"
          placeholder="Search for Product, eg. Apple, Tea"
          borderBottomWidth={0}
        />
        <MyMenuItems navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  mainViewStyles: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
});

export default MySearchItem;
