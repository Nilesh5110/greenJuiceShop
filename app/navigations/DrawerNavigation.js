import React from "react";
import { View, StyleSheet, Text } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import DrawerContent from "../navigations/DrawerContent";

import HomeScreen from "../screens/HomeScreen";
import AddMember from "../screens/AddMember";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(navigation) => <DrawerContent {...navigation} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Drawer_AddMember" component={AddMember} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  containar: {
    flex: 1,
  },
});

export default DrawerNavigation;
