import * as Notifications from "expo-notifications";

const requestPermissionOnIos = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};

export default requestPermissionOnIos;
