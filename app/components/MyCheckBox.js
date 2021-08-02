import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import MyText from "../components/MyText";
import MyIcon from "../components/MyIcon";

import Img from "../assets/images/blueberry.png";

let items = [];
let result;
function MyCheckBox({ name, item, status, handleAdd }) {
  const [checked, setChecked] = useState(false);
  //const [items, setItems] = useState([]);

  const clickButton = (value) => {
    if (checked) {
      result = items.filter((p) => p.item !== value);
      items = result;
    } else {
      items.push({ item: value });
      result = items.slice();
      items = result;
    }
    checked ? setChecked(false) : setChecked(true);

    handleAdd(items);
  };

  return (
    <TouchableOpacity
      onPress={() => clickButton(status + item.title)}
      style={styles.containar}
    >
      <Image style={styles.imgStyles} source={Img} />
      {checked && (
        <MyIcon
          style={styles.iconStyles}
          backgroundColor="#fff"
          name={name}
          size={50}
          iconColor="#581845"
        />
      )}
      <MyText style={styles.txtStyles} label={item.title} />
      <MyText style={styles.txtStyles} label={"$ " + item.price} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imgStyles: {
    width: 75,
    height: 75,
  },
  iconStyles: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  txtStyles: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default MyCheckBox;
