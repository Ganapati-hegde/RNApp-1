import { View, ActivityIndicator, StyleSheet } from "react-native";

const PageLoader = () => {
  return (
    <View style={styles.pageLoaderContainer}>
      <ActivityIndicator size="large" color="#B43E43" />
    </View>
  );
};
const styles = StyleSheet.create({
  pageLoaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PageLoader;
