import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ children, style, onPress }) => {
  const onPressHandler = () => {
    onPress();
  };

  return (
    <View style={[style]}>
      <TouchableOpacity
        underlayColor="white"
        onPress={() => {
          onPressHandler();
        }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "open-sans-bold",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
