import { useLayoutEffect, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../Utils/Store/AuthContext";
import PressableIcon from "../components/PressableIcon";

const Goals = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
      headerRight: () => {
        return (
          <Pressable
            onPress={() => {
              authCtx.logout();
            }}
          >
            <MaterialIcons name="logout" size={24} color="white" />
          </Pressable>
        );
      },
    });
  }, []);

  const onPressHandler = () => {
    navigation.navigate("AddNewGoal");
  };
  const iconConfigs = {
    name: "md-add-circle",
    size: 70,
    color: "#B43E43",
  };

  return (
    <View style={styles.goalsContainer}>
      <View style={styles.addIcon}>
        <PressableIcon iconConfigs={iconConfigs} onPress={onPressHandler} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  goalsContainer: {
    flex: 1,
    position: "relative",
  },
  addIcon: {
    position: "absolute",
    bottom: 30,
    right: 10,
  },
});
export default Goals;
