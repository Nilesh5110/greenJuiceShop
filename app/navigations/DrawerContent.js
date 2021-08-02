import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import logo from "../assets/images/logo.png";
import Routes from "../navigations/routes";

function DrawerContent({ navigation }) {
  return (
    <View style={styles.containar}>
      <DrawerContentScrollView {...navigation}>
        <View>
          <Image source={logo} style={styles.logoStyles} />
        </View>
        <View style={styles.itemListStyles}>
          <DrawerItem
            style={styles.drawerItemStyles}
            icon={({ color, size }) => (
              <MaterialCommunityIcons size={30} name="account-multiple" />
            )}
            label="Add Member"
            onPress={() => {
              navigation.navigate(Routes.DRAWER_ADDMEMBER);
            }}
          />
          <DrawerItem
            style={styles.drawerItemStyles}
            icon={({ color, size }) => (
              <MaterialCommunityIcons size={30} name="account" />
            )}
            label="Admin"
            onPress={() => {
              navigation.navigate(Routes.STACK_ORDERPOPUP);
            }}
          />
          <DrawerItem
            style={styles.drawerItemStyles}
            icon={({ color, size }) => <AntDesign size={30} name="setting" />}
            label="Setting"
          />
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons size={30} name="exit-to-app" />
        )}
        label="sign out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
  },
  logoStyles: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  itemListStyles: {
    flex: 1,
  },
  drawerItemStyles: {
    width: "100%",
  },
});

export default DrawerContent;
