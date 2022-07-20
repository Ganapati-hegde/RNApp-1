import { Text, StyleSheet } from "react-native";

const Title = ({ children, style }) => {
  return <Text style={[styles.titleContainer, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  titleContainer: {
    color: "#fff",
    fontSize: 24,
    // fontFamily: 'open-sans-bold',
  },
});

export default Title;
