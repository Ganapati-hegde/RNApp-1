import { View, Text, StyleSheet, Pressable } from "react-native";

const Button = ({ children, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : "")}
        onPress={() => {
          onPress();
        }}
      >
        <Text style={styles.button}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {
    color: "#fff",
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 18,
  },
  pressed: {
    opacity: 0.3,
  },
});

export default Button;
