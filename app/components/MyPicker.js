import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../config/Colors";
import MyText from "./MyText";
import MyPickerItem from "./MyPickerItem";

function MyPicker({
  icon,
  items,
  onSelectItem,
  width = "100%",
  selectedItem,
  placeholder,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.containar, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={Colors.medium}
              style={styles.iconStyles}
            />
          )}
          <MyText
            style={styles.txtInput}
            label={selectedItem ? selectedItem.name : placeholder}
          />
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={Colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MyPickerItem
              label={item.name}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  containar: {
    backgroundColor: Colors.txtDark,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  txtInput: {
    flex: 1,
    fontSize: 18,
    color: Colors.dark,
  },
  iconStyles: {
    marginRight: 10,
  },
});

export default MyPicker;
