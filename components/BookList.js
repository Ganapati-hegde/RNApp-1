import { View, Text, Image, StyleSheet, FlatList, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const BookList = ({ route }) => {
  const allBooks = route.params.booksData;
  const len = route.params.len;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `All ${len}'s Books`,
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);
  return (
    <LinearGradient colors={["#8C4994", "#B43E43"]} style={{ flex: 1 }}>
      <View style={styles.booksContainer}>
        <FlatList
          data={allBooks}
          renderItem={(book) => {
            return (
              <View style={styles.bookWrapper}>
                <Image
                  //   source={require("../assets/images/things-fall-apart.jpg")}
                  source={{ uri: "https://loremflickr.com/150/200/book" }}
                  //   source={{ uri: `../assets/${book.item.imageLink}` }}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />

                <Text numberOfLines={1} style={styles.bookTitle}>
                  {book.item.title}
                </Text>
                <View style={styles.detailButtonContainer}>
                  <Text style={styles.detailButton}>Detail</Text>
                  <AntDesign name="arrowright" size={15} color="white" />
                </View>
              </View>
            );
          }}
          numColumns={2}
        ></FlatList>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  booksContainer: {
    flex: 1,
    marginBottom: 16,
  },
  bookWrapper: {
    width: 150,
    // backgroundColor: "#B43E43",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    borderColor: "#171717",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
    padding: 8,
    //   paddingVertical: 20,
  },
  imageStyle: {
    width: "100%",
    height: 200,
  },
  bookTitle: {
    textAlign: "center",
    padding: 5,
  },
  detailButtonContainer: {
    backgroundColor: "#F30157",

    textAlign: "center",
    padding: 16,
    borderRadius: "100%",

    marginTop: 8,
    textAlign: "center",
    padding: 5,
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailButton: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 14,
  },
});
export default BookList;
