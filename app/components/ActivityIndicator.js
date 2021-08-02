import React from "react";
import { View, StyleSheet, Modal } from "react-native";

import LottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <Modal visible={visible}>
      <LottieView autoPlay loop source={require("../animations/loader.json")} />
    </Modal>
  );
}

const styles = StyleSheet.create({});

export default ActivityIndicator;
