import axios from "axios";

export const FetchNotifications = async () => {
  const resp = await axios.get(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/notifications.json`
  );
  const notifications = [];
  for (const key in resp.data) {
    const notificationObj = {
      id: key,
      title: resp.data[key].title,
      body: resp.data[key].body,
      data: resp.data[key].data,
      date: resp.data[key].date,
      time: resp.data[key].time,
      isRead: resp.data[key].isRead,
    };
    notifications.push(notificationObj);
  }
  return notifications;
};
