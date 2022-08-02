import axios from "axios";

export const UpdateNotification = async (data, token) => {
  data = Object.assign(data, { isRead: true });
  const resp = await axios.put(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/notifications/${data.id}.json?auth=${token}`,
    data
  );
  console.log(resp);
  return resp;
};
