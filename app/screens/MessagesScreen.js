import React, { useState } from "react";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

const initialMessages = [
  {
    id: 1,
    title: "Last trip with MarceLimo 02/01/2021",
    subtitle: "hello",
    description:
      "Chicago O'Hare International Airport(ORD), Chicago,IL to  Marriott Hotel, Chicago,IL",
    image: require("../assets/romy.png"),
  },
  {
    id: 2,
    title: "02/05/2021",
    description:
      "Marriott Hotel, Chicago,IL to O'Hare International Airport(ORD), Chicago,IL",
    image: require("../assets/limodriver.png"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Driver Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/limodriver.png"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

export default MessagesScreen;
