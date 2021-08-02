import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "../navigations/StackNavigator";

import DrawerNavigation from "../navigations/DrawerNavigation";

import MyScreen from "../components/MyScreen";

function MyNavigation() {
  return (
    <MyScreen>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </MyScreen>
  );
}

export default MyNavigation;
