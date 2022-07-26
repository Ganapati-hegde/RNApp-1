import { useLayoutEffect } from "react";
import { Text } from "react-native";

const NotificationsPage = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
    });
  }, []);
  return <Text>hi</Text>;
};
export default NotificationsPage;
