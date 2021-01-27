import React from "react";
import * as Yup from "yup";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import { AppForm, AppFormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();
    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }
    resetForm();

    Notifications.presentNotificationAsync({
      title: "Awesome!",
      body: "We will make sure you will have the best ride experience!",
    });
  };
  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={2}
        placeholder="Message..."
      />
      <SubmitButton title="Preferences request:" />
    </AppForm>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
