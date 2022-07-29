import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import moment from "moment";
import { UpdateNotification } from "../Utils/requests/UpdateNotification";

const Notification = ({ item }) => {
  const navigation = useNavigation();
  const onPressHandler = ({ item }) => {
    switch (item.data.page) {
      case "Goals":
        navigation.navigate("Goals", null);
        break;
      case "AddNewGoal":
        navigation.navigate("AddNewGoal", {
          goalName: item.data.data.goalName,
          goalDescription: item.data.data.goalDescription,
          completionDate: item.data.data.completionDate,
          id: item.data.data.id,
        });
        break;
      default:
        break;
    }
    if (!item.isRead) {
      updateNotification(item);
    }
  };
  const updateNotification = async (data) => {
    try {
      await UpdateNotification(data);
    } catch (error) {}
  };
  return (
    <Pressable
      onPress={() => {
        onPressHandler(item);
      }}
      style={({ pressed }) => (pressed ? styles.pressed : "")}
    >
      <View
        style={[
          styles.notifiationContainer,
          item.item.isRead ? styles.readStatus : styles.unReadStatus,
        ]}
      >
        <View style={styles.row}>
          <Text style={styles.title}>{item.item.title}</Text>
          <Text style={styles.dateTimeAgo}>
            {moment(item.item.date + " " + item.item.time).fromNow()}
          </Text>
        </View>

        <Text style={styles.body}>{item.item.body}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  notifiationContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    paddingVertical: 10,
    paddingLeft: 30,
    paddingRight: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  unReadStatus: {
    borderLeftWidth: 6,
    borderLeftColor: "#B43E43",
    // borderTopLeftRadius: 6,
    // borderBottomLeftRadius: 6,
    backgroundColor: "#DCDCDC",
  },
  readStatus: {
    borderLeftWidth: 0,
    backgroundColor: "#fff",
    color: "#B43E43",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    marginBottom: 5,
  },
  body: {
    fontFamily: "open-sans",
    fontSize: 12,
  },
  dateTimeAgo: {
    fontFamily: "open-sans",
    fontSize: 10,
    color: "#808080",
  },
  pressed: {
    opacity: 0.6,
  },
});
export default Notification;
