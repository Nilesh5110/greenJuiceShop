import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import MyText from "../components/MyText";
import Aud_notes from "../assets/images/AUD_notes.png";
import Edc from "../assets/images/edc.png";
import MyButton from "../components/MyButton";
import MyTextInputFancy from "../components/MyTextInputFancy";

import MyScan from "../components/MyScan";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

import Routs from "../navigations/routes";

import { Insert_each_Order } from "../helper/db";
import MyMemberPopUp from "../components/MyMemberPopUp";

function TakingOrders({ navigation, route }) {
  const [total_amount, setTotal_amount] = useState([]);
  const [total_cups, setTotal_cups] = useState([]);
  const [amount, setAmount] = useState();
  const [today, setToday] = useState("");
  const [visable, setVisable] = useState(false);
  const [modalPopUp, setModalPopUp] = useState(false);
  const [scan, setScan] = useState();
  const [touchBtn, setTouchBtn] = useState(true);
  const [details, setDetails] = useState({ cup: 0 });
  const [posts, setPosts] = useState(route.params.allOrders);

  let total = [{ sum: 0, cups: 0 }];

  //let posts = route.params.allOrders;

  useEffect(() => {
    loadListings();
  }, []);
  useEffect(() => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    setToday(date + "/" + month + "/" + year);

    amountCalculation();
  }, []);

  const {
    data,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings_members);

  let setFatchedData = [];

  for (const key in data) {
    setFatchedData.push({
      key: key,
      name: data[key].data.name,
      phone: data[key].data.phone,
      email: data[key].data.email,
      cardNo: data[key].data.cardNo,
      cup: data[key].data.cup,
    });
  }

  const amountCalculation = () => {
    for (let i = 0; i < posts.length; i++) {
      total.push({
        sum: Number(posts[i].numberOfOrders) * Number(posts[i].price),
        cups: Number(posts[i].numberOfOrders),
      });
    }
    setTotal_amount(total.reduce((a, b) => a + b.sum, 0));
    setTotal_cups(total.reduce((a, b) => a + b.cups, 0));
  };

  const onClickUsePoints = () => {
    if (details.cup == 0) {
      Alert.alert("Please, Scan the card");
      return;
    }
    if (!posts[0]) {
      Alert.alert("Could you please give an order first?");
      return;
    }
    setTouchBtn(false);
    let credit = details.cup / 10;
    let leftCup = details.cup % 10;
    let remaining_credit = 0;

    if (credit <= total_cups) {
      remaining_credit = total_cups - credit;
    } else {
      remaining_credit = credit - total_cups;
    }

    let used_credit = parseInt(credit) - remaining_credit;

    let new_orderList = [];
    let remaining_Cups = 0;
    for (let i = 0; i < posts.length; i++) {
      if (Number(posts[i].numberOfOrders) >= used_credit) {
        if (Number(posts[i].numberOfOrders) >= credit) {
          remaining_Cups = Number(posts[i].numberOfOrders) - credit;
          new_orderList = [
            (posts[i].numberOfOrders = remaining_Cups.toString()),
            ...posts,
          ];
          setPosts(new_orderList);
        } else {
          remaining_Cups = credit - Number(posts[i].numberOfOrders);
          new_orderList = [(posts[i].numberOfOrders = "0"), ...posts];
          setPosts(new_orderList);
        }
        amountCalculation();
        onClickHandler(leftCup);
      }
    }
  };

  const onClickHandler = async (...data) => {
    if (!scan) return;
    if (!details) {
      Alert.alert("Please, Scan the card");
      return;
    }
    let cup = 0;

    if (!data[0]) {
      cup = total_cups + details.cup;
    } else {
      cup = data[0];
    }

    const reSetData = [];

    reSetData.push({
      cardNo: details.cardNo,
      cup: cup,
      email: details.email,
      name: details.name,
      phone: details.phone,
    });

    const result = await listingsApi.updateListing_members(
      reSetData[0],
      details.key
    );
  };

  const checkingData = (data) => {
    for (let i = 0; i < setFatchedData.length; i++) {
      if (setFatchedData[i].cardNo == data) {
        setDetails(setFatchedData[i]);
        setModalPopUp(true);
      } else {
        Alert.alert("This card is not registered");
      }
    }
  };

  const onClickBack = () => {
    navigation.goBack();
  };

  const insertData = async (type) => {
    for (let i = 0; i < posts.length; i++) {
      const result = await listingsApi.addListing_allOrders(
        today,
        "modhwadiyan@gmail.com",
        posts[i],
        type
      );
      // const dbResult = Insert_each_Order(
      //   today,
      //   "modhwadiyan@gmail.com",
      //   posts[i].order_id,
      //   posts[i].cupSize,
      //   posts[i].numberOfOrders,
      //   posts[i].totalPrice,
      //   type
      // );
    }
    onClickBack();
  };

  const onClickScan = () => {
    setVisable(true);
  };
  const Scaned = (data) => {
    setScan(data);
    checkingData(data);
    setVisable(false);
  };
  const onClickCard = (type) => {
    if (total_amount == 0) {
      Alert.alert("Worning!!", "Please, Add some Orders", [{ text: "Ok" }]);
      return;
    }
    if (type == "cash" && amount >= total_amount) {
      insertData(type);
    } else if (type == "cash") {
      Alert.alert("Worning!!", "Amount is less than order's amount", [
        { text: "Ok" },
      ]);
    }
    if (type == "card") {
      insertData(type);
    }

    onClickHandler();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cashView}>
        <TouchableOpacity onPress={() => onClickCard("card")}>
          <Image style={{ height: 100, width: 100 }} source={Edc} />
          <MyText style={styles.lableStyles} label="Card" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickCard("cash")}>
          <Image style={{ height: 100, width: 100 }} source={Aud_notes} />
          <MyText style={styles.lableStyles} label="Cash" />
        </TouchableOpacity>
      </View>
      <View style={styles.midalViewStyles}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyTextInputFancy
            editable={false}
            width="50%"
            icon="cup"
            width="50%"
            value={details ? parseInt(details.cup / 10).toString() : "Cup"}
          />
          <MyButton
            label="Use Points"
            width="50%"
            color={touchBtn ? "yellow" : "opium"}
            onPress={onClickUsePoints}
            touchAble={touchBtn}
          />
        </View>
        <View>
          <MyButton
            label="Scan"
            color="secondry"
            onPress={() => onClickScan()}
          />
          <MyButton label="Back" color="pink" onPress={onClickBack} />
        </View>
      </View>
      <View style={styles.takingMoney}>
        <MyTextInputFancy
          style={styles.inputTextStyles}
          keyboardType="numeric"
          value={amount}
          onChangeText={(a) => setAmount(a)}
          placeholder="$"
        />
        <View style={styles.paymentViewStyles}>
          {/* <View style={{ width: "100%", alignItems: "flex-end" }}>
            <MyText style={styles.txtStyles} label={"Guven by Customer $ "} />
            <MyText style={styles.txtStyles} label={"- Total  $ "} />
          </View> */}
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <MyText style={styles.txtStyles} label={amount} />
            <MyText style={styles.txtStyles} label={total_amount} />
          </View>
        </View>
        <View style={{ borderWidth: 0.5 }}></View>
        <MyText style={styles.txtPayBackStyles} label={amount - total_amount} />
      </View>

      <Modal visible={visable}>
        <MyScan
          visable={(v) => setVisable(v)}
          getData={(data) => Scaned(data)}
        />
      </Modal>
      <Modal visible={modalPopUp}>
        <MyMemberPopUp
          visable={(v) => setModalPopUp(v)}
          sendDetails={details}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cashView: {
    justifyContent: "space-around",
    width: "20%",
    marginLeft: 10,
  },
  midalViewStyles: {
    alignItems: "center",
    width: "33%",
  },
  btnStylesView: {
    marginTop: 50,
    flexDirection: "row",
    alignSelf: "center",
  },
  lableStyles: {
    fontSize: 25,
  },
  inputTextStyles: {},
  takingMoney: {
    width: "33%",
  },
  txtStyles: {
    fontSize: 20,
  },
  txtPayBackStyles: {
    fontSize: 20,
    alignSelf: "flex-end",
    paddingRight: "33%",
  },
  paymentViewStyles: {
    flexDirection: "row",
    paddingRight: 90,
  },
});

export default TakingOrders;
