import axios from "axios";

export const DeleteNotifications = async (token) => {
  const resp = await axios.delete(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/notifications.json?auth=${token}`
  );
  return resp;
};
