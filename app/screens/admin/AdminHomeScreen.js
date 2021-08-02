import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import MyText from "../../components/MyText";
import MyButton from "../../components/MyButton";
import Colors from "../../config/Colors";
import MyCategory from "../../components/admin/MyCategory";
import MySubCategory from "../../components/admin/MySubCategory";
import MyExtra from "../../components/admin/MyExtra";

import Routes from "../../navigations/routes";

const Categories = [
  { label: "Fruits", value: "1" },
  { label: "Ice-Cream", value: "2" },
  { label: "Juice", value: "3" },
];
function AdminHomeScreen({ navigation }) {
  const [category, setCategory] = useState("category");

  const LogOut = () => {
    navigation.replace(Routes.STACK_HOMESCREEN);
  };
  return (
    <View style={styles.containar}>
      <View style={styles.adminPanelStyles}>
        <MyText style={styles.txtStyles} label="Admin Panel" />
        <MyButton
          labelStyles={styles.btnTxtStyles}
          label="Category"
          color="darkBlue"
          onPress={() => setCategory("category")}
        />
        <MyButton
          labelStyles={styles.btnTxtStyles}
          label="Sub Category"
          color="pink"
          onPress={() => setCategory("subCategory")}
        />
        <MyButton
          labelStyles={styles.btnTxtStyles}
          label="Extra"
          color="yellow"
          onPress={() => setCategory("extra")}
        />
        <MyButton
          labelStyles={styles.btnTxtStyles}
          label="LogOut"
          color="primary"
          onPress={LogOut}
        />
      </View>
      <View style={styles.categoryStyles}>
        {category == "category" ? (
          <View style={styles.categoryView}>
            <MyCategory />
          </View>
        ) : null}
        {category == "subCategory" ? (
          <View style={styles.categoryView}>
            <MySubCategory />
          </View>
        ) : null}
        {category == "extra" ? (
          <View style={styles.categoryView}>
            <MyExtra />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  adminPanelStyles: {
    backgroundColor: Colors.secondry,
    alignItems: "center",
    height: "100%",
    width: "20%",
    justifyContent: "space-around",
  },
  txtStyles: {
    fontSize: 30,
  },
  btnTxtStyles: {
    color: "#fff",
  },
  categoryStyles: {
    height: "100%",
    width: "80%",
  },
  categoryView: {
    alignSelf: "center",
    height: "100%",
    width: "80%",
  },
});

export default AdminHomeScreen;
