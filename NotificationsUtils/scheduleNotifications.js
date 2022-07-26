import * as Notifications from "expo-notifications";

const scheduleNotifications = async (title, body, data) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: data },
    },
    trigger: { seconds: 1 },
  });
};

export default scheduleNotifications;
