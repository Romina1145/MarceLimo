import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import colors from "../config/colors";
import AppText from "./AppText";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReacheable === false)
    return (
      <View style={styles.container}>
        <AppText styles={styles.text}>No internet Connection </AppText>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    zIndex: 1,
    top: Constants.statusBarHeight,
    width: "100%",
  },
  text: {
    color: "white",
  },
});

export default OfflineNotice;
