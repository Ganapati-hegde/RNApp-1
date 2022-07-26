import { View, Text, Pressable, StyleSheet } from "react-native";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
    zIndex: 9,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
});
export default Card;
