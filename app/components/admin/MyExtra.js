import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import MyText from "../MyText";
import { select_each_order } from "../../helper/db";
import MyAllOrderShow from "../MyAllOrderShow";

import useApi from "../../hooks/useApi";
import listingsApi from "../../api/listings";

function MyExtra({ props }) {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    loadListings();
    // getAllOrders();
  }, []);

  const {
    data,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings_allOrders);

  let setFatchedData = [];

  for (const key in data) {
    setFatchedData.push({
      orderId: key,
      cupSize: data[key].data.cupSize,
      date: data[key].data.date,
      name: data[key].data.name,
      totalOrders: data[key].data.totalOrders,
      totalAmount: data[key].data.totalAmount,
      paymentTyle: data[key].data.paymentTyle,
    });
  }

  const getAllOrders = async () => {
    const dbResult = await select_each_order();
    setAllData(dbResult.rows._array);
  };
  return (
    <View style={styles.containar}>
      <View style={styles.subViews}>
        <MyText style={[styles.titlesStyles]} label="Date" />
        <MyText style={[styles.titlesStyles]} label="Name" />
        <MyText style={styles.titlesStyles} label="Cup Size" />
        <MyText style={styles.titlesStyles} label="Total Orders" />
        <MyText style={styles.titlesStyles} label="Total Amount" />
        <MyText style={styles.titlesStyles} label="Payment Type" />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={setFatchedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MyAllOrderShow item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
  },
  subViews: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titlesStyles: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default MyExtra;
