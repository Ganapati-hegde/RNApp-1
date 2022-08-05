import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Input = ({
  placeholder,
  secureTextEntry,
  inputText,
  setInputText,
  error,
}) => {
  const onChangeTextHandler = (val) => {
    setInputText(val);
  };
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        placeholderTextColor="#A2AAB3"
        placeholder={placeholder}
        style={styles.inputText}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeTextHandler}
        value={inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
  },
  inputText: {
    color: "#A2AAB3",
    fontSize: 16,
    width: "100%",
  },
});

export default Input;
