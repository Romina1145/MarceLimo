import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title} </AppText>
        <AppText style={styles.price}>${listing.price} </AppText>

        <View style={styles.userContainer}>
          <View>
            <ListItem
              image={require("../assets/romy.png")}
              title="Driver availabe:"
              subTitle="Romina "
            />
          </View>
          <View>
            <ListItem
              image={require("../assets/limodriver.png")}
              title="Driver available:"
              subTitle="Jhon"
            />
          </View>
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    fontStyle: "italic",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.primary,
    fontStyle: "italic",
  },
  userContainer: {
    marginVertical: 2,
  },
});
export default ListingDetailsScreen;
