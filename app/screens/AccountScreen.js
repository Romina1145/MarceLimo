import React from "react";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import { StyleSheet, View, FlatList, Text } from "react-native";
import colors from "../config/colors";
import ListItemSeparatorComponent from "../components/ListItemSeparator";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "Updates on your account",
    icon: {
      name: "account",
      backgroundColor: colors.primary,
    },
    targetScreen: "Messages2",
  },
  {
    title: "Past trips history ",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/limo.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparatorComponent}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#FF0000" />}
        onPress={() => logOut()}
      />
      <Text style={styles.text}>Schedule a trip</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.tertiary,
  },
  text: {
    width: "100%",
    height: 60,
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    fontSize: 20,
  },
});
export default AccountScreen;
