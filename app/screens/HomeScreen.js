import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, FlatList } from "react-native";

import MySearchItem from "../components/MySearchItem";
import MyButton from "../components/MyButton";
import fruit_bg from "../assets/images/fruit_bg.jpg";
import MyOrderCard from "../components/MyOrderCard";
import MyAllOrder from "../components/MyAllOrder";
import MyText from "../components/MyText";
import Routs from "../navigations/routes";

import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

import { select_All_Main_Variety, taking_All_order } from "../helper/db";
import ActivityIndicator from "../components/ActivityIndicator";
import { Modal } from "react-native";

const { width, height } = Dimensions.get("window");

function HomeScreen({ navigation }) {
  const [total_amount, setTotal_amount] = useState([]);
  const [allData, setAllData] = useState([]);
  const [updateAllData, setUpdateAllData] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  useEffect(() => {
    getAll_MainVariety();
  }, []);

  const {
    data,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings_mainVariety);

  let setFatchedData = [];
  //console.log(data);
  for (const key in data) {
    setFatchedData.push({
      main_variety_id: key,
      name: data[key].data.name,
      img: data[key].data.image,
      status: data[key].data.status,
      color: data[key].data.color,
    });
  }

  let total = [{ sum: 0 }];

  const getAll_MainVariety = async () => {
    //setLoading(true);
    // const dbResult = await select_All_Main_Variety();
    // setAllData(dbResult.rows._array);
    //setLoading(false);
  };

  const allGetOrders = (data) => {
    const posts = [data, ...updateAllData];

    setUpdateAllData(posts);
    totalSum(posts);
  };

  const deleteOrders = (id) => {
    console.log(id);
    const posts = updateAllData.filter((d) => d.unique_id !== id);

    totalSum(posts);
    setUpdateAllData(posts);
  };
  const plushOrders = (id) => {
    const posts = updateAllData.filter((d) => d.unique_id === id);

    posts[0].numberOfOrders = parseInt(posts[0].numberOfOrders) + 1;
    posts[0].totalPrice = posts[0].numberOfOrders * posts[0].price;

    const abc = updateAllData;
    for (let i = 0; i < abc.length; i++) {
      if (abc[i].unique_id === posts[0].unique_id) abc[i] = posts[0];
      break;
    }

    totalSum(abc);
    setUpdateAllData(abc);
  };
  const minusOrders = (id) => {
    const posts = updateAllData.filter((d) => d.unique_id === id);

    if (parseInt(posts[0].numberOfOrders) <= 1) {
      deleteOrders(posts[0].unique_id);
      return;
    }

    posts[0].numberOfOrders = parseInt(posts[0].numberOfOrders) - 1;

    posts[0].totalPrice = posts[0].numberOfOrders * posts[0].price;

    const abc = updateAllData;
    for (let i = 0; i < abc.length; i++) {
      if (abc[i].unique_id === posts[0].unique_id) abc[i] = posts[0];
      break;
    }

    totalSum(abc);
    setUpdateAllData(abc);
  };

  const totalSum = (posts) => {
    for (let i = 0; i < posts.length; i++) {
      total.push({ sum: posts[i].totalPrice });
    }
    setTotal_amount(total.reduce((a, b) => a + b.sum, 0));
  };

  const takingOrders = (allOrders) => {
    navigation.navigate(Routs.STACK_TAKINGORDERSSCREEN, { allOrders });
    setUpdateAllData([]);
    setTotal_amount([0]);
  };

  return (
    <View style={styles.containar}>
      {error && (
        <>
          <MyText label="Couldn't retrieve the listings" />
          <MyButton label="Retry" onPress={loadListings} />
        </>
      )}
      <Image style={styles.imgBackgroundStyles} source={fruit_bg} />
      <View style={styles.mainViewStyles}>
        <View style={styles.searchViewStyles}>
          <MySearchItem navigation={navigation} />
        </View>
        <View style={styles.subViewStyles}>
          <View style={{ width: "70%", height: "100%" }}>
            <View style={{ width: "100%" }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={setFatchedData}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <MyButton label={item.name} color={item.color} />
                )}
              />
            </View>

            <ActivityIndicator visible={loading} />
            <View style={{ width: "100%", height: "80%" }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={setFatchedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <MyOrderCard
                    navigation={navigation}
                    id={item.main_variety_id}
                    label={item.name}
                    color={item.color}
                    orderPicker={(a) => allGetOrders(a)}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.orderViewStyles}>
            <View style={styles.viewOrderList}>
              <View style={{ alignSelf: "center", marginBottom: 30 }}>
                <MyButton
                  onPress={() => takingOrders(updateAllData)}
                  labelStyles={{ fontSize: 25 }}
                  touchAble={true}
                  iconName="cart-outline"
                  label="My Cart"
                  color="yellow"
                />
              </View>
              <FlatList
                data={updateAllData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(itemData) => (
                  <MyAllOrder
                    deleteOrder={(id) => deleteOrders(id)}
                    plushOrder={(id) => plushOrders(id)}
                    minusOrder={(id) => minusOrders(id)}
                    orderDetails={itemData.item}
                  />
                )}
              />
            </View>
            <View style={styles.viewTotalAmount}>
              <MyText
                label={"Total :  $" + total_amount}
                style={styles.totalAmountStyles}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgBackgroundStyles: {
    width: "100%",
    height: "100%",
    opacity: 0.1,
  },
  searchViewStyles: {
    width: "100%",
    height: "13%",
    backgroundColor: "#fff",
    alignItems: "center",

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
  mainViewStyles: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  subViewStyles: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  orderViewStyles: {
    backgroundColor: "#fff",
    width: "30%",
    height: "100%",
    alignItems: "center",
  },
  viewOrderList: {
    width: "100%",
    height: "80%",
  },
  getOrderViewStyles: {
    width: "100%",
    height: "100%",
  },
  viewTotalAmount: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    borderTopWidth: 1,
  },
  totalAmountStyles: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
