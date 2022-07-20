import { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import ErrorText from "./ErrorText";

const InputLabel = ({ inputConfigs, label, style, error }) => {
  return (
    <View style={[styles.InputLabelConatiner, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        {...inputConfigs}
        style={[
          styles.input,
          inputConfigs && inputConfigs.multiline ? styles.multiLineInput : "",
        ]}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  InputLabelConatiner: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    padding: 10,
    borderColor: "#A7A7A7",
    borderWidth: 1,
    borderRadius: 6,
    color: "#fff",
    backgroundColor: "#F5F6F8",
  },
  multiLineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputText: {},
  label: {
    marginVertical: 8,
    fontSize: 12,
    color: "#fff",
    fontFamily: "open-sans",
  },
});

export default InputLabel;
