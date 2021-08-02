import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import * as Firebase from "firebase";
import { YellowBox } from "react-native";
import uuid4 from "uuid/v4";
import listingsApi from "../../api/listings";
import useApi from "../../hooks/useApi";

import ActivityIndicator from "../ActivityIndicator";
import MyText from "../MyText";
import MyAddValue from "../MyAddValue";
import MyPicker from "../MyPicker";
import MyValueList from "./MyValueList";

import {
  select_All_Main_Variety,
  Insert_Sub_Variety,
  select_All_Sub_Variety,
  deleteSelected_SubVariety,
} from "../../helper/db";

function MySubCategory({}) {
  const [allData, setAllData] = useState([]);
  const [all_subItems, setAll_SubItems] = useState([]);
  const [selectedCategoty, setSelectedCategoty] = useState();

  const [loadingIndicator, setLoadingIndicator] = useState(false);

  useEffect(() => {
    // getAllMainVariety();
    // getAll_Sub_Variety();
    loadListings();
  }, []);

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }

  const fatchImages = (item, imageUniqueName) => {
    // Create a reference to the file we want to download
    let ref = Firebase.storage()
      .ref()
      .child("SubVariety/" + imageUniqueName);
    // Get the download URL
    ref
      .getDownloadURL()
      .then((imgUrl) => {
        item.img = imgUrl;
        item.status = true;
        insertHandler({ ...item });
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
      .child("SubVariety/" + imageUniqueName);
    return ref.put(blob);
  };

  const insertHandler = async (item) => {
    item.main_variety_id = selectedCategoty.main_variety_id;

    // const dbResult = await Insert_Sub_Variety(
    //   selectedCategoty.main_variety_id,
    //   item.itemname,
    //   item.img,
    //   item.L_Cup,
    //   item.M_Cup,
    //   selectedCategoty.status
    // );

    const result = await listingsApi.addListing_subVariety(item);
    if (!result.ok) return Alert.alert("Couldn't save the recourd");
    setLoadingIndicator(false);

    Alert.alert("Record has been successfully uploaded");

    //getAll_Sub_Variety();
  };

  const clickHandler = (item) => {
    setLoadingIndicator(true);
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

  const {
    data,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings_mainVariety);

  let setFatchedData = [];

  for (const key in data) {
    setFatchedData.push({
      main_variety_id: key,
      name: data[key].data.name,
      // img: data[key].data.image,
      // status: data[key].data.status,
      // color: data[key].data.color,
    });
  }

  const getAllMainVariety = async () => {
    // const dbResult = await select_All_Main_Variety();
    // setAllData(dbResult.rows._array);
  };

  const getAll_Sub_Variety = async () => {
    const dbResult = await select_All_Sub_Variety();
    setAll_SubItems(dbResult.rows._array);
  };

  const delete_Sub_Item_Handler = async (id) => {
    await deleteSelected_SubVariety(id);
    getAll_Sub_Variety();
  };

  return (
    <View style={styles.containar}>
      <ActivityIndicator visible={loadingIndicator} />
      <MyText style={styles.txtLabelStyles} label="Sub Category" />
      <View style={styles.mainViewStyles}>
        <MyPicker
          placeholder="selece main Category"
          onSelectItem={(item) => setSelectedCategoty(item)}
          selectedItem={selectedCategoty}
          items={setFatchedData}
          width="35%"
        />
        <MyAddValue
          style={{ width: "75%" }}
          cupPrice={true}
          setItems={(item) => clickHandler(item)}
        />
      </View>
      <View>
        <FlatList
          data={all_subItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MyValueList
              label={item.name}
              imageUri={item.image}
              onPress={() => delete_Sub_Item_Handler(item.sub_variety_id)}
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
  },
  mainViewStyles: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  txtLabelStyles: {
    fontSize: 40,
  },
});

export default MySubCategory;
