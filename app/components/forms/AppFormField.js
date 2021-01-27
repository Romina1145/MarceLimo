import React from "react";
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function AppFormField({ name, width, ...otherProps }) {
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    values,
    touched,
  } = useFormikContext();
  return (
    <>
      <TextInput
        onChangeText={(text) => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      {<ErrorMessage error={errors[name]} visible={touched[name]} />}
    </>
  );
}

export default AppFormField;
