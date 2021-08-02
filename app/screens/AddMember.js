import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Modal, Alert } from "react-native";

import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInputFancy";
import Routes from "../navigations/routes";
import MyScan from "../components/MyScan";
import listingsApi from "../api/listings";

function AddMember({ navigation }) {
  const [visable, setVisable] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [scan, setScan] = useState();

  useEffect(() => {
    loadListings();
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
      name: data[key].data.name,
      phone: data[key].data.phone,
      email: data[key].data.email,
      cardNo: data[key].data.cardNo,
    });
  }

  const onCancelClick = () => {
    navigation.navigate(Routes.STACK_HOMESCREEN);
  };

  const onOkClick = () => {
    insertData();
  };

  const insertData = async () => {
    const item = [];
    if (!scan) {
      Alert.alert("Please, Scan card properly!");
      return;
    }

    item.push({
      name: name,
      phone: phone,
      email: email.toLowerCase(),
      cardNo: scan,
      cup: 0,
    });

    const result = await listingsApi.addListing_members(item[0]);
    if (!result.ok) return Alert.alert("Couldn't save the recourd");

    setEmail(null);
    setName(null);
    setPhone(null);
    setScan(null);
    navigation.navigate(Routes.STACK_HOMESCREEN);
  };

  const ScaneData = (data) => {
    setScan(data);
    setVisable(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewStyles}>
        <MyTextInput
          width="45%"
          style={styles.txtInputStyles}
          icon="account"
          placeholder="Name :"
          onChangeText={(n) => setName(n)}
          value={name}
        />
        <MyTextInput
          width="45%"
          style={styles.txtInputStyles}
          icon="cellphone-android"
          placeholder="Phone Number :"
          keyboardType="decimal-pad"
          onChangeText={(p) => setPhone(p)}
          value={phone}
        />
      </View>
      <View style={styles.viewStyles}>
        <MyTextInput
          width="45%"
          style={styles.txtInputStyles}
          icon="email"
          placeholder="Email :"
          onChangeText={(e) => setEmail(e)}
          value={email}
          autoCapitalize="none"
        />
        <MyTextInput
          width="45%"
          style={styles.txtInputStyles}
          icon="barcode-scan"
          placeholder="Card Number:"
          keyboardType="decimal-pad"
          value={scan}
          editable={false}
        />
      </View>

      <MyButton
        style={{ alignSelf: "center" }}
        label="Scan"
        color="secondry"
        onPress={() => setVisable(true)}
      />

      <View style={styles.btnStyles}>
        <MyButton label="Cancel" color="yellow" onPress={onCancelClick} />
        <MyButton label="Ok" color="pink" onPress={onOkClick} />
      </View>
      <Modal visible={visable}>
        <MyScan visable={(a) => setVisable(a)} getData={(a) => ScaneData(a)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  btnStyles: {
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  viewStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddMember;
