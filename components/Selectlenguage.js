import { useLayoutEffect } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import Books from "../Data/books_data.json";
import { LinearGradient } from "expo-linear-gradient";
import GroupByKey from "../Utils/GroupByKey";

const groupingByLenguage = GroupByKey(Books, "language");

const Selectlenguage = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Select your preference",
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);
  const onPress = (data, array) => {
    navigation.navigate("BooksList", {
      booksData: array[data.item],
      len: data.item,
    });
  };

  const render = (itemData, array) => {
    return (
      <Pressable
        android_ripple={{ color: "#171717" }}
        style={({ pressed }) => (pressed ? styles.onPressedStyle : "")}
        onPress={() => onPress(itemData, array)}
      >
        <View style={styles.card}>
          <Text style={styles.lengText}>{itemData.item}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={["#8C4994", "#B43E43"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={Object.keys(groupingByLenguage)}
          renderItem={(itemData) => render(itemData, groupingByLenguage)}
          numColumns={2}
        ></FlatList>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 16,
    height: 150,
    width: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#171717",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  lengText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "#B43E43",
  },
  onPressedStyle: {
    opacity: 0.4,
  },
});

export default Selectlenguage;
