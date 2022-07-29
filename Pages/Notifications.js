import {
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { FontAwesome } from "@expo/vector-icons";
import { FetchNotifications } from "../Utils/requests/fetchNotifications";
import Card from "../components/Card";
import Notification from "../components/Notification";
import { DeleteNotifications } from "../Utils/requests/deleteNotifications";
import { useFocusEffect } from "@react-navigation/native";

import PageLoader from "../components/PageLoader";

const NotificationsPage = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState([]);

  const onPressDelete = async () => {
    try {
      setNotificationsLoading(true);
      await DeleteNotifications();
      setNotificationsLoading(false);
      setNotifications([]);
    } catch (error) {}
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
      headerRight: () => {
        return (
          notifications.length > 0 && (
            <Pressable
              style={({ pressed }) => (pressed ? styles.pressed : "")}
              onPress={onPressDelete}
            >
              <Text style={styles.clear}>Clear</Text>
            </Pressable>
          )
        );
      },
    });
  }, [notifications]);
  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const notificationsArray = await FetchNotifications();
      setNotifications(notificationsArray);
      setNotificationsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (isFocused) {
      fetchNotifications();
    }
  }, []);
  useEffect(() => {
    // this is to call api as soon as we land on the notification page
    const focusListener = navigation.addListener("didFocus", () => {
      fetchNotifications();
    });
    return focusListener;
  }, [navigation]);
  const onPressHandler = (data) => {
    navigation.navigate(data.item.data.page);
  };

  const renderItem = (itemData) => {
    return <Notification item={itemData} />;
  };
  return (
    <View style={styles.notificationContainer}>
      {!notificationsLoading ? (
        notifications.length > 0 ? (
          <>
            <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            ></FlatList>
          </>
        ) : (
          <View
            style={[styles.notificationContainer, styles.emptyNotification]}
          >
            <FontAwesome name="bell-slash-o" size={70} color="#B43E43" />
            <Text style={styles.noNotifications}>No Notifications yet!!</Text>
          </View>
        )
      ) : (
        <PageLoader />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    // marginBottom: 16,
  },
  emptyNotification: {
    justifyContent: "center",
    alignItems: "center",
  },
  noNotifications: {
    color: "#B43E43",
    marginVertical: 5,
    fontSize: 12,
    fontFamily: "open-sans-bold",
  },
  pressed: {
    overflow: "hidden",
    opacity: 0.6,
  },
  clear: {
    fontFamily: "open-sans-bold",
    color: "#fff",
  },
});
export default NotificationsPage;
