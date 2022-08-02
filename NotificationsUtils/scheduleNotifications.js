import * as Notifications from "expo-notifications";
import axios from "axios";
import moment from "moment";

const scheduleNotifications = async (title, body, data, token) => {
  try {
    const resp = await axios.post(
      `https://rnapp-414cc-default-rtdb.firebaseio.com/notifications.json?auth=${token}`,
      {
        title: title,
        body: body,
        data: data,
        date: moment().format("YYYY/MM/DD"),
        time: moment().format("hh:mm: a"),
        isRead: false,
      }
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: data },
      },
      trigger: { seconds: 1 },
    });
    return resp;
  } catch (error) {}
};

export default scheduleNotifications;
