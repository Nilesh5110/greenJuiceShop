import React from "react";
import { View, StyleSheet } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

import Routes from "../navigations/routes";

import MyButton from "./MyButton";

function MyMenuItems({ navigation }) {
  _menu = null;

  setMenuRef = (ref) => {
    _menu = ref;
  };

  hideMenu = () => {
    _menu.hide();
  };

  showMenu = () => {
    _menu.show();
  };

  const adminClickHandler = () => {
    _menu.hide();
    navigation.navigate(Routes.STACK_ADMINHOMESCREEN);
  };

  const addMemberClickHandler = () => {
    _menu.hide();
    navigation.navigate(Routes.STACK_ADDMEMBER);
  };
  return (
    <View style={styles.containar}>
      <Menu
        ref={setMenuRef}
        button={
          <MyButton
            onPress={showMenu}
            iconName="dots-vertical"
            width={40}
            height={35}
            color="white"
          />
        }
      >
        <MenuItem onPress={() => adminClickHandler()}>Admin Login</MenuItem>
        <MenuItem onPress={hideMenu}>Create New Admin</MenuItem>
        <MenuItem onPress={() => addMemberClickHandler()}>AddMember</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>About Us</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({});

export default MyMenuItems;
