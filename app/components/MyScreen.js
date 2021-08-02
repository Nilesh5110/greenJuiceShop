import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Constants from "expo-constants";

function MyScreen({ style, children }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
});

export default MyScreen;
