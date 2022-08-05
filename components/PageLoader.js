import { View, ActivityIndicator, StyleSheet } from "react-native";

const PageLoader = () => {
  return (
    <View style={styles.pageLoaderContainer}>
      <ActivityIndicator
        animating={true}
        size="large"
        style={{ opacity: 1 }}
        color="#B43E43"
      />
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
