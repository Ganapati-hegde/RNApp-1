import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PressableIcon = ({ iconConfigs, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : "")}
      onPress={() => {
        onPress();
      }}
    >
      <Ionicons {...iconConfigs} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});
export default PressableIcon;
