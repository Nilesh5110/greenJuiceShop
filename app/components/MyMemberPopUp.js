import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MyButton from "./MyButton";
import MyTextInputFancy from "./MyTextInputFancy";

function MyMemberPopUp({ visable, sendDetails }) {
  return (
    <View style={styles.container}>
      <View style={styles.firstMainView}>
        <MyTextInputFancy
          value={sendDetails.name}
          editable={false}
          width="40%"
          icon="account"
        />
        <MyTextInputFancy
          editable={false}
          width="40%"
          value={sendDetails.phone}
          icon="cellphone-android"
        />
      </View>
      <View style={styles.secondMainView}>
        <MyTextInputFancy
          editable={false}
          width="40%"
          value={sendDetails.email}
          icon="email"
        />
        <MyTextInputFancy
          editable={false}
          width="15%"
          icon="cup"
          value={sendDetails.cup.toString()}
        />
        <MyTextInputFancy
          editable={false}
          width="40%"
          value={sendDetails.cardNo}
          icon="barcode-scan"
        />
      </View>
      <View style={styles.btnViewStyles}>
        <MyButton label="Back" color="yellow" onPress={() => visable(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  secondMainView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnViewStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default MyMemberPopUp;
