import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CategoryPickerItem from "../components/CategoryPickerItem";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  { label: "Sedan", value: 1, backgroundColor: "black", icon: "car" },
  { label: "SUV", value: 2, backgroundColor: "black", icon: "car" },
  { label: "Sprinter", value: 3, backgroundColor: "black", icon: "car" },
];

function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (result.ok) {
      setUploadVisible(true);
      return alert("Could not save the listing");
    }
    resetForm();
  };

  const simpleAlertHandler = () => {
    alert("Your trip has been successfully scheduled!");
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          time: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppText style={styles.text}>Select car type from our fleet</AppText>
        <FormField
          maxLength={255}
          name="station"
          placeholder="Pick up location"
        />
        <MaterialCommunityIcons name="arrow-up" color="green" size={20} />
        <FormField
          maxLength={255}
          name="drop"
          placeholder="Drop off location"
        />
        <MaterialCommunityIcons name="arrow-down" color="green" size={20} />

        <FormField maxLength={8} name="time" placeholder="Time" width={160} />
        <MaterialCommunityIcons name="clock" color="green" size={20} />

        {/* <FormField maxLength={8} name="price" placeholder="Price" width={160} /> */}
        <Picker
          items={categories}
          name="category"
          placeholder="Category"
          numberOfColumns={3}
          width="100%"
          PickerItemComponent={CategoryPickerItem}
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Aditional Preferences"
        />
        <AppButton title="Request trip" onPress={simpleAlertHandler} />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: "gray",
  },
});

export default ListingEditScreen;
