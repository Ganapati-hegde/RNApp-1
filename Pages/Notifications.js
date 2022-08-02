import {
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { FontAwesome } from "@expo/vector-icons";
import { FetchNotifications } from "../Utils/requests/fetchNotifications";
import Card from "../components/Card";
import Notification from "../components/Notification";
import { DeleteNotifications } from "../Utils/requests/deleteNotifications";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../Utils/Store/AuthContext";

import PageLoader from "../components/PageLoader";

const NotificationsPage = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState([]);
  const [noMoreNotifications, setNoMoreNotifications] = useState(false);
  const authCtx = useContext(AuthContext);

  const onPressDelete = async () => {
    try {
      setNotificationsLoading(true);
      await DeleteNotifications(authCtx.token);
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
      const notificationsArray = await FetchNotifications(authCtx.token);
      setNotifications(notificationsArray.reverse());
      setNotificationsLoading(false);
      setRefreshing(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = useCallback(async () => {
    let noMoreData = false;
    setRefreshing(true);
    try {
      const notificationsArray = await FetchNotifications(authCtx.token);
      setRefreshing(false);
      if (notificationsArray.length === notifications.length) {
        noMoreData = true;
      }
      setNoMoreNotifications(noMoreData);
      setNotifications(notificationsArray.reverse());
      setTimeout(() => {
        setNoMoreNotifications(false);
      }, 2000);
    } catch (error) {}
  }, []);

  const renderItem = (itemData) => {
    return <Notification item={itemData} />;
  };
  return (
    <View style={styles.notificationContainer}>
      {!notificationsLoading ? (
        notifications.length > 0 ? (
          <>
            {noMoreNotifications && (
              <Text style={[styles.noNotifications, styles.noMoreData]}>
                No more notifications!!
              </Text>
            )}
            <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
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
  noMoreData: {
    textAlign: "center",
    marginVertical: 10,
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
