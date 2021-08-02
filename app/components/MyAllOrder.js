import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MyButton from "./MyButton";
import MyIcon from "./MyIcon";
import MyText from "./MyText";

function MyAllOrder({
  total,
  orderDetails,
  deleteOrder,
  plushOrder,
  minusOrder,
}) {
  const deleteOnClick = (id) => {
    deleteOrder(id);
  };

  const plushOnPress = (id) => {
    plushOrder(id);
  };

  const minusOnPress = (id) => {
    minusOrder(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderNumView}>
        <MyText label={orderDetails.name} style={{ fontSize: 25 }} />
        <MyText label={orderDetails.cupSize} style={{ fontSize: 25 }} />
        <MyText label={"$" + orderDetails.price} style={{ fontSize: 25 }} />
        <MyText label={orderDetails.totalPrice} style={{ fontSize: 25 }} />
      </View>

      <View style={styles.orderNumView}>
        <MyButton
          height={40}
          width={40}
          color={"yellow"}
          label={"+"}
          onPress={() => plushOnPress(orderDetails.unique_id)}
        />
        <View style={styles.viewTotalOrder}>
          <MyText
            style={{ fontSize: 25 }}
            label={orderDetails.numberOfOrders}
          />
        </View>
        <MyButton
          height={40}
          width={40}
          color={"yellow"}
          label={"-"}
          onPress={() => minusOnPress(orderDetails.unique_id)}
        />
        <MyIcon
          name="delete"
          backgroundColor="#fff"
          iconColor="#4877D0"
          size={75}
          touchAble={true}
          onPress={() => deleteOnClick(orderDetails.unique_id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "#CFCECE",
  },
  orderNumView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  viewTotalOrder: {
    borderWidth: 1,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyAllOrder;
