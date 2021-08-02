import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Routes from "../navigations/routes";

import Logo from "../assets/images/logo.png";

function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace(Routes.STACK_HOMESCREEN);
  }, 3000);

  return (
    <View style={styles.containar}>
      <Image style={styles.imgStyles} source={Logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgStyles: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;
