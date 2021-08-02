import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MyLabel from "./MyLabel";

let allData = [];
let extra_result;

function MyOrderLabel({ allOrder }) {
  const [extra, setExtra] = useState(allOrder[0].extraNote);

  const deleteHandler = (orderName) => {};

  const deleteExtraItems = (extraItems) => {
    extra_result = extra.filter((p) => p.item !== extraItems);
    setExtra(extra_result);
  };

  return (
    <View style={styles.containar}>
      {allOrder[0].juiceName && (
        <MyLabel
          label={allOrder[0].juiceName}
          name="delete"
          cupSize={allOrder[0].cupSize}
          price="$10"
          onPress={() => deleteHandler(allOrder[0].juiceName)}
        />
      )}

      {extra && (
        <FlatList
          data={extra}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MyLabel
              onPress={() => deleteExtraItems(item.item)}
              style={styles.extraNotesStyles}
              size={40}
              label={item.item}
              name="delete"
              price="$ 0.5"
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    alignItems: "center",
  },
  extraNotesStyles: {
    fontSize: 15,
    justifyContent: "center",
  },
});

export default MyOrderLabel;
