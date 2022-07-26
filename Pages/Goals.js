import { useLayoutEffect, useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { AuthContext } from "../Utils/Store/AuthContext";
import PressableIcon from "../components/PressableIcon";
import { FetchGoals } from "../Utils/requests/fetchGoals";
import Card from "../components/Card";
import PageLoader from "../components/PageLoader";
import Info from "../components/Info";

const Goals = ({ navigation }) => {
  const [goalList, setGoalList] = useState([]);
  const [goalsLoading, setGoalsLoading] = useState(false);
  const iconConfigs = {
    name: "md-add-circle",
    size: 70,
    color: "#B43E43",
  };
  const logoutIconConfig = {
    name: "exit-outline",
    size: 24,
    color: "#fff",
  };
  const authCtx = useContext(AuthContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
      headerRight: () => {
        return (
          <PressableIcon
            iconConfigs={logoutIconConfig}
            onPress={() => {
              authCtx.logout();
            }}
          ></PressableIcon>
        );
      },
    });
  }, []);
  useEffect(() => {
    setGoalsLoading(true);
    const fetchGoals = async () => {
      try {
        const resp = await FetchGoals();
        setGoalList(resp);
        setGoalsLoading(false);
      } catch (error) {}
    };
    fetchGoals();
  }, []);

  const onEditPressHandler = ({
    goalName,
    goalDescription,
    completionDate,
    id,
  }) => {
    navigation.navigate("AddNewGoal", {
      goalName,
      goalDescription,
      completionDate,
      id,
    });
  };
  const onPressHandler = () => {
    navigation.navigate("AddNewGoal", null);
  };
  const renderItem = (itemData) => {
    return (
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : "")}
        onPress={() => {
          onEditPressHandler({
            goalName: itemData.item.goalName,
            goalDescription: itemData.item.goalDescription,
            completionDate: itemData.item.completionDate,
            id: itemData.item.id,
          });
        }}
      >
        <Card>
          <View style={styles.goalContainer}>
            <Text style={styles.goalName}>{itemData.item.goalName}</Text>
          </View>
          <View style={styles.goalContainer}>
            <Text style={styles.goalDescription}>
              {itemData.item.goalDescription}
            </Text>
          </View>

          <Text style={styles.completionDate}>
            Complete by : {itemData.item.completionDate}
          </Text>
        </Card>
      </Pressable>
    );
  };

  return (
    <View style={styles.goalsContainer}>
      {!goalsLoading ? (
        <View style={styles.goalData}>
          {goalList.length === 0 ? (
            <View style={styles.emptyGoal}>
              <Fontisto
                name="shopping-basket-add"
                size={70}
                color="#B43E43"
                onPress={onPressHandler}
              />
            </View>
          ) : (
            <>
              <FlatList
                data={goalList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
              <View style={styles.addIcon}>
                <PressableIcon
                  iconConfigs={iconConfigs}
                  onPress={onPressHandler}
                />
              </View>
            </>
          )}
        </View>
      ) : (
        <PageLoader />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  goalsContainer: {
    flex: 1,
    position: "relative",
    padding: 16,
    zIndex: 9,
  },
  emptyGoal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goalData: {
    flex: 1,
  },
  addIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 10,
  },
  goalContainer: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    marginBottom: 6,
    paddingBottom: 6,
  },
  goalName: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#B43E43",
  },
  completionDate: {
    // paddingTop: 6,
    fontSize: 12,
    color: "#7B7B7B",
  },
  pressed: {
    opacity: 0.4,
  },
});
export default Goals;
