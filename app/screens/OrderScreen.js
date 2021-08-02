import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import MyText from "../components/MyText";
import MyRadioButton from "../components/MyRadioButton";
import Routes from "../navigations/routes";
import MyButton from "../components/MyButton";

import AsyncStorage from "@react-native-community/async-storage";

import { taking_order_table_insert } from "../helper/db";

function OrderScreen({ navigation, id, route }) {
  const [cupSize, setCupSize] = useState();
  const [numberOfOrders, setNumberOfOrders] = useState(1);

  let a = 0;
  const doneOnClick = async () => {
    let price = 0;
    if (cupSize === "L") {
      price = route.params.data.L_cup_Price;
    } else {
      price = route.params.data.M_cup_Price;
    }
    await taking_order_table_insert(
      route.params.data.sub_variety_id,
      route.params.data.name,
      cupSize,
      price,
      numberOfOrders,
      price * numberOfOrders
    );

    try {
      await AsyncStorage.setItem(
        "token",
        JSON.stringify({ id: 1, name: "nilesh" })
      );
    } catch (error) {
      console.log(error);
    }

    navigation.replace(Routes.STACK_HOMESCREEN, { post: a });
  };

  const cancelOnClick = () => {
    navigation.navigate(Routes.STACK_HOMESCREEN);
  };

  const plushOnPress = () => {
    setNumberOfOrders(numberOfOrders + 1);
  };

  const minusOnPress = () => {
    if (numberOfOrders > 0) setNumberOfOrders(numberOfOrders - 1);
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.titleStyles} label={route.params.data.name} />
      <Image
        style={styles.imgStyles}
        source={{ uri: route.params.data.image }}
      />
      <MyRadioButton
        L_Price={route.params.data.L_cup_Price}
        M_Price={route.params.data.M_cup_Price}
        cupSize={(cup) => setCupSize(cup)}
      />

      <View style={styles.OrderViewStyles}>
        <MyButton
          color={"yellow"}
          label="+"
          labelStyles={styles.labelStyles}
          onPress={() => plushOnPress()}
        />
        <View style={styles.orderNumberView}>
          <MyText label={numberOfOrders} style={{ fontSize: 45 }} />
        </View>
        <MyButton
          color={"yellow"}
          label="-"
          labelStyles={styles.labelStyles}
          onPress={() => minusOnPress()}
        />
      </View>
      <View style={styles.OrderViewStyles}>
        <MyButton color={"pink"} label="Done" onPress={() => doneOnClick()} />
        <MyButton
          color={"pink"}
          label="Cancel"
          onPress={() => cancelOnClick()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleStyles: {
    fontSize: 50,
    marginBottom: 50,
  },
  imgStyles: {
    height: 250,
    width: 250,
    borderRadius: 10,
  },
  orderNumberView: {
    borderWidth: 1,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyles: {
    fontSize: 45,
  },
  OrderViewStyles: {
    flexDirection: "row",
    marginVertical: 15,
  },
});

export default OrderScreen;
