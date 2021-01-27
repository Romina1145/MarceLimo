import React from "react";
import { Text, StyleSheet } from "react-native";

function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: "Avenir",
  },
});

export default AppText;
