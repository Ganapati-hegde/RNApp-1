import { Text, View, StyleSheet } from "react-native";

const ErrorText = ({ children }) => {
  return (
    <View style={styles.errorTextContainer}>
      <Text style={styles.errorText}>{children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  errorTextContainer: {
    marginVertical: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#cc0000",
  },
});

export default ErrorText;
