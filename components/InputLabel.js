import { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import ErrorText from "./ErrorText";

const InputLabel = ({ inputConfigs, label, style, error }) => {
  return (
    <View style={[styles.InputLabelConatiner, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#D3D3D3"
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
    padding: 16,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fff",
    color: "#B43E43",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 6,
  },
  multiLineInput: {
    minHeight: 100,
    maxHeight: 100,
    overflow: "scroll",
    textAlignVertical: "top",
  },
  inputText: {},
  label: {
    marginVertical: 8,
    fontSize: 12,
    color: "#B43E43",
    fontFamily: "open-sans",
  },
});

export default InputLabel;
