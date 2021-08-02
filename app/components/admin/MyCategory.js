import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import storage from "@react-native-firebase/storage";
import * as Firebase from "firebase";
import { YellowBox } from "react-native";
import uuid4 from "uuid/v4";

import listingsApi from "../../api/listings";

import ActivityIndicator from "../ActivityIndicator";
import { firebaseConfig } from "../../../firebase";
import MyText from "../MyText";
import MyAddValue from "../MyAddValue";
import MyValueList from "./MyValueList";
import MyPicker from "../MyPicker";

import {
  Insert_Main_Variety,
  select_All_Main_Variety,
  updateSelectedMainVariety,
  deleteSelectedMainVariety,
} from "../../helper/db";

const colors = [
  { name: "primary", color: "#4877D0" },
  { name: "secondry", color: "#169654" },
  { name: "green", color: "#4D4C92" },
  { name: "pink", color: "#EC609B" },
  { name: "yellow", color: "#FFCE2E" },
];

function MyCategory({ props }) {
  YellowBox.ignoreWarnings(["Setting a timer for a long period of time"]);
  const [allData, setAllData] = useState([]);
  const [selectedCategoty, setSelectedCategoty] = useState();
  const [loading, setLoading] = useState(false);

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    getAllMainVariety();
  }, []);

  const InsertData = async (item) => {
    const result = await listingsApi.addListing_mainVariety(item);
    if (!result.ok) {
      Alert.alert("Couldn't save the recourd");
      setLoading(false);
      return;
    }

    setLoading(false);
    Alert.alert("Record has been successfully uploaded");

    // const dbResult = await Insert_Main_Variety(
    //   item.itemname,
    //   item.img,
    //   selectedCategoty.name
    // );
    // getAllMainVariety();
  };

  const fatchImages = (item, imageUniqueName) => {
    // Create a reference to the file we want to download
    let ref = Firebase.storage()
      .ref()
      .child("MainVariety/" + imageUniqueName);
    // Get the download URL
    ref
      .getDownloadURL()
      .then((imgUrl) => {
        item.img = imgUrl;
        item.color = selectedCategoty.name;
        item.status = true;
        InsertData({ ...item });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImg = async (item, imageUniqueName) => {
    const response = await fetch(item.img);
    const blob = await response.blob();

    let ref = Firebase.storage()
      .ref()
      .child("MainVariety/" + imageUniqueName);
    return ref.put(blob);
  };

  const onClickHandler = (item) => {
    setLoading(true);
    let uuid = uuid4();
    const imageUniqueName = `${uuid}`;

    uploadImg(item, imageUniqueName)
      .then(() => {
        fatchImages(item, imageUniqueName);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  const getAllMainVariety = async () => {
    const dbResult = await select_All_Main_Variety();
    setAllData(dbResult.rows._array);
  };

  const deleteItemHandler = (id) => {
    deleteSelectedMainVariety(id);
    getAllMainVariety();
  };

  const update_status = async (value, id) => {
    await updateSelectedMainVariety(value.toString(), id);
  };

  return (
    <View style={styles.containar}>
      <ActivityIndicator visible={loading} />
      <MyText style={styles.txtLabelStyles} label="Category" />
      <View style={styles.mainView}>
        <MyPicker
          width="30%"
          placeholder="Select Color"
          onSelectItem={(item) => setSelectedCategoty(item)}
          selectedItem={selectedCategoty}
          items={colors}
        />
        <MyAddValue
          style={{ width: "75%" }}
          setItems={(item) => onClickHandler(item)}
        />
      </View>
      <View style={styles.subView}>
        <FlatList
          data={allData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MyValueList
              imageUri={item.image}
              label={item.name}
              onPress={() => deleteItemHandler(item.main_variety_id)}
              value={item.status}
              newValue={(value) => update_status(value, item.main_variety_id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  mainView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subView: {
    width: "70%",
  },
  txtLabelStyles: {
    fontSize: 40,
    paddingBottom: 20,
  },
});

export default MyCategory;
