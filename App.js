import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";

import MyNavigation from "./app/navigations/MyNavigation";
import {
  main_Variety_table,
  sub_Variety_table,
  order_Table,
  taking_order_table,
  each_Order_Table,
} from "./app/helper/db";

const fetchFonts = () => {
  return Font.loadAsync({
    "ubuntu-bold": require("./app/assets/fonts/Ubuntu-Bold.ttf"),
    "ubuntu-regular": require("./app/assets/fonts/Ubuntu-Regular.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  main_Variety_table();
  sub_Variety_table();
  order_Table();
  taking_order_table();
  each_Order_Table();

  if (!dataLoaded) {
    return (
      <>
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setDataLoaded(true)}
          onError={(err) => console.log(err)}
        />
      </>
    );
  }

  return <MyNavigation />;
}
