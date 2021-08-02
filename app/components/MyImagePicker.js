import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../config/Colors";
import MyIcon from "./MyIcon";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

function MyImagePicker({ imageUri, onChangeImage }) {
  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure, do you want to delete this Image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error reading in Image", error);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <MyIcon name="camera" />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightDark,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: 50,
    width: 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default MyImagePicker;
