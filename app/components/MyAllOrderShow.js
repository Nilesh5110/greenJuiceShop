import React from "react";
import { View, StyleSheet } from "react-native";
import MyText from "./MyText";

function MyAllOrderShow({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.subViews}>
        <MyText style={styles.titlesStyles} label={item.date} />
        <MyText
          style={[{ width: 100, marginLeft: 20 }, styles.titlesStyles]}
          label={item.name}
        />
        <MyText
          style={[{ width: 100, marginLeft: 40 }, styles.titlesStyles]}
          label={item.cupSize}
        />
        <MyText
          style={[{ width: 200, paddingLeft: 40 }, styles.titlesStyles]}
          label={item.totalOrders}
        />
        <MyText
          style={[{ width: 100 }, styles.titlesStyles]}
          label={"$" + item.totalAmount}
        />
        <MyText
          style={[{ width: 100, marginLeft: 50 }, styles.titlesStyles]}
          label={item.paymentTyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subViews: {
    flexDirection: "row",
  },
  titlesStyles: {
    alignSelf: "center",
    fontSize: 17,
  },
});

export default MyAllOrderShow;
