import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import Colors from "../config/Colors";

const { width, height } = Dimensions.get("window");
let TouchableCmp = View;

function MyTextInput({
  icon,
  rightIcon,
  ioniconsIcon,
  rightSizeIconTouchAble = false,
  passIconHide,
  borderBottomWidth = 1,
  style,
  txtStyle,
  ...otherProps
}) {
  const [hidePassword, setHidePassword] = useState(false);

  const hidePasswordHandler = () => {
    if (hidePassword) {
      setHidePassword(false);
    } else {
      setHidePassword(true);
    }
  };

  if (rightSizeIconTouchAble === true) {
    TouchableCmp = TouchableOpacity;
  } else {
    TouchableCmp = View;
  }

  if (rightSizeIconTouchAble) {
    if (hidePassword) {
      rightIcon = Platform.OS = "android" ? "md-eye" : "ios-eye";
    } else {
      rightIcon = Platform.OS = "android" ? "md-eye-off" : "ios-eye-off";
    }
  }

  return (
    <View
      style={[
        { borderBottomWidth: borderBottomWidth },
        styles.containar,
        style,
      ]}
    >
      {ioniconsIcon && (
        <FontAwesome5 name={ioniconsIcon} size={20} color={Colors.primary} />
      )}
      <MaterialCommunityIcons name={icon} size={24} color={Colors.primary} />

      <TextInput
        style={[styles.text, txtStyle]}
        secureTextEntry={rightSizeIconTouchAble ? !hidePassword : hidePassword}
        placeholderTextColor={Colors.medium}
        {...otherProps}
      />
      <View
        style={{
          position: "absolute",
          right: 10,
          alignSelf: "center",
        }}
      >
        {rightIcon && (
          <TouchableCmp onPress={hidePasswordHandler}>
            <Ionicons name={rightIcon} size={24} color={Colors.primary} />
          </TouchableCmp>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    borderBottomColor: Colors.lightDark,
  },

  text: {
    color: Colors.dark,
    fontSize: 18,
    fontFamily: "ubuntu-regular",
    width: "75%",
    marginHorizontal: 10,
  },
});

export default MyTextInput;
