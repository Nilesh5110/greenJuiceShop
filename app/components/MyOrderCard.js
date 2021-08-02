import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import Routes from "../navigations/routes";

import Colors from "../config/Colors";
import MyItemLabel from "./MyItemLabel";
import MyText from "./MyText";
import { Modal } from "react-native";
import MyButton from "../components/MyButton";
import MyRadioButton from "../components/MyRadioButton";
import { AsyncStorage } from "react-native";
import MyTextInput from "./MyTextInput";

import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

import {
  select_All_Sub_Variety,
  taking_order_table_insert,
} from "../helper/db";

function MyOrderCard({ label, color, id, navigation, orderPicker }) {
  const [allData, setAllData] = useState([]);
  const [getData, setGetData] = useState([]);
  const [modalVisable, setModalVisable] = useState(false);
  const [numberOfOrders, setNumberOfOrders] = useState();
  const [cupSize, setCupSize] = useState();

  useEffect(() => {
    //getAll_subCatagery();
    loadListings();
  }, []);

  const {
    data,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings_subVariety);

  let setFatchedData = [];

  for (const key in data) {
    setFatchedData.push({
      sub_variety_id: key,
      main_variety_id: data[key].data.main_variety_id,
      name: data[key].data.name,
      img: data[key].data.image,
      L_cup: data[key].data.L_cup,
      M_cup: data[key].data.M_cup,
      status: data[key].data.status,
    });
  }

  // const getAll_subCatagery = async () => {
  //   const dbResult = await select_All_Sub_Variety();
  //   setAllData(dbResult.rows._array);
  // };

  const displayedJuices = setFatchedData.filter(
    (juice) => juice.main_variety_id === id
  );

  const onClickHandler = (data) => {
    setGetData(data);
    setModalVisable(true);
  };

  // const plushOnPress = () => {
  //   setNumberOfOrders(numberOfOrders + 1);
  // };

  // const minusOnPress = () => {
  //   if (numberOfOrders > 0) setNumberOfOrders(numberOfOrders - 1);
  // };

  const doneOnClick = async () => {
    let price = 0;
    if (cupSize === "L") {
      price = getData.L_cup;
    } else {
      price = getData.M_cup;
    }

    if (numberOfOrders <= 0 || numberOfOrders == null) {
      setNumberOfOrders(null);
      setModalVisable(false);
      return;
    }

    let allOrders = {
      unique_id: getData.name + cupSize,
      order_id: getData.sub_variety_id,
      name: getData.name,
      cupSize: cupSize,
      price: price,
      numberOfOrders: numberOfOrders,
      totalPrice: price * numberOfOrders,
    };

    setModalVisable(false);
    orderPicker(allOrders);
    setNumberOfOrders(null);
  };

  const cancelOnClick = () => {
    setModalVisable(false);
    setNumberOfOrders(null);
  };

  return (
    <View style={[styles.containar, { backgroundColor: Colors[color] }]}>
      <View style={styles.txtViewStyles}>
        <MyText style={styles.txtTitleStyles} label={label} />
      </View>
      <View style={styles.itemViewStyles}>
        <FlatList
          numColumns={4}
          data={displayedJuices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <MyItemLabel
              style={{ width: "20%" }}
              onPress={() => onClickHandler(itemData.item)}
              itemName={itemData.item.name}
              img={itemData.item.img}
            />
          )}
        />
      </View>
      <Modal visible={modalVisable} animationType="slide">
        <View style={styles.modalMainView}>
          <MyText style={styles.orderLable} label={getData.name} />
          <View>
            {/* <Image style={styles.imgStyles} source={{ uri: getData.img }} />
             */}
          </View>
          <MyRadioButton
            L_Price={getData.L_cup}
            M_Price={getData.M_cup}
            cupSize={(cup) => setCupSize(cup)}
          />
          <View style={styles.OrderViewStyles}>
            {/* <MyButton
              color={"yellow"}
              label="+"
              labelStyles={styles.labelStyles}
              onPress={plushOnPress}
            /> */}
            <MyButton color={"pink"} label="Done" onPress={doneOnClick} />
            <View style={styles.orderNumberView}>
              {/* <MyText label={numberOfOrders} style={{ fontSize: 45 }} /> */}
              <MyTextInput
                txtStyle={{ fontSize: 30, textAlign: "center" }}
                borderBottomWidth={0}
                onChangeText={(text) => setNumberOfOrders(text)}
                value={numberOfOrders}
                keyboardType="decimal-pad"
                autoFocus={true}
              />
            </View>
            {/* <MyButton
              color={"yellow"}
              label="-"
              labelStyles={styles.labelStyles}
              onPress={minusOnPress}
            /> */}
            <MyButton color={"pink"} label="Cancel" onPress={cancelOnClick} />
          </View>
          <View style={styles.OrderViewStyles}></View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    overflow: "hidden",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  txtViewStyles: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
  },
  txtTitleStyles: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 25,
    color: "#fff",
    width: "300%",
    alignSelf: "center",
    textAlign: "center",
  },
  itemViewStyles: {
    width: "90%",
    height: "100%",
    backgroundColor: "#fff",
  },
  modalMainView: {
    alignItems: "center",
  },
  imgStyles: {
    height: 250,
    width: 250,
    borderRadius: 10,
  },
  orderLable: {
    fontSize: 50,
  },
  OrderViewStyles: {
    flexDirection: "row",
    marginVertical: 25,
    alignItems: "center",
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
});

export default MyOrderCard;
