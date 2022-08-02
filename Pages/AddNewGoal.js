import { useLayoutEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ValidateGoalData from "../Utils/validatGoalData";
import InputLabel from "../components/InputLabel";
import { CreateGoal } from "../Utils/requests/createGoal";
import { UpdateGoal } from "../Utils/requests/updateGoal";
import { DeleteGoal } from "../Utils/requests/deleteGoal";
import CustomButton from "../components/CustomButton";
import schedulePushNotification from "../NotificationsUtils/scheduleNotifications";
import { AuthContext } from "../Utils/Store/AuthContext";

const AddNewGoal = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const goalParams = route.params;
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    goalName: goalParams ? goalParams.goalName : "",
    goalDescription: goalParams ? goalParams.goalDescription : "",
    completionDate: goalParams ? goalParams.completionDate : "",
  });
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: goalParams ? "Edit Goal" : "Add Goal",
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
      headerRight: () =>
        goalParams ? (
          <Pressable
            onPress={() => {
              Alert.alert("Delete Goal", "Do you want to delete this goal?", [
                { text: "Cancel" },
                { text: "Delete", onPress: () => deleteGoal() },
              ]);
            }}
            style={({ pressed }) => (pressed ? styles.pressed : "")}
          >
            <MaterialIcons name="delete-outline" size={25} color="#fff" />
          </Pressable>
        ) : null,
    });
  }, []);
  const deleteGoal = async () => {
    try {
      await DeleteGoal(goalParams.id, authCtx.token);
      schedulePushNotification(
        `Goal Deleted!!`,
        `${goalParams.goalName} goal is deleted`,
        { data: goalParams, page: "Goals" },
        authCtx.token
      );
      navigation.replace("Goals");
    } catch (error) {
      Alert.alert(
        "Unable to delete",
        "There is some problem with deleting the goal",
        [{ text: "Ok" }]
      );
    }
  };

  const onChangeTextHandler = (type, enteredVal) => {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [type]: enteredVal,
      };
    });
  };
  const saveGoal = async (goalName, goalDescription, completionDate) => {
    setLoading(true);
    const id = goalParams ? goalParams.id : "id" + new Date().getTime();
    const goalData = {
      id: id,
      goalName: goalName,
      goalDescription: goalDescription,
      completionDate: completionDate,
    };
    if (goalParams) {
      try {
        await UpdateGoal(
          id,
          goalName,
          goalDescription,
          completionDate,
          authCtx.token
        );
        schedulePushNotification(
          `Goal Editted!!`,
          `${goalName} goal is editted`,
          { data: goalData, page: "AddNewGoal" },
          authCtx.token
        );
        navigation.replace("Goals");
      } catch (error) {
        setLoading(false);
      }
    } else {
      try {
        await CreateGoal(
          id,
          goalName,
          goalDescription,
          completionDate,
          authCtx.token
        );

        schedulePushNotification(
          `Goal Creted!!`,
          `${goalName} goal is created`,
          { data: goalData, page: "Goals" },
          authCtx.token
        );
        navigation.replace("Goals");
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const onPressHandler = () => {
    const error = ValidateGoalData(inputValues);

    setErrors(error);
    if (Object.keys(error).length === 0) {
      saveGoal(
        inputValues.goalName,
        inputValues.goalDescription,
        inputValues.completionDate
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.addNewGoalContainer}>
        <InputLabel
          style={styles.inputLabel}
          label="Goal Name"
          inputConfigs={{
            placeholder: "Goal Name",
            maxLength: 30,
            onChangeText: (val) => {
              onChangeTextHandler("goalName", val);
            },
            value: inputValues.goalName,
          }}
          error={errors["goalName"]}
        />
        <InputLabel
          style={styles.inputLabel}
          label="Goal Description"
          inputConfigs={{
            placeholder: "Goal Description",
            multiline: true,
            onChangeText: (val) => {
              onChangeTextHandler("goalDescription", val);
            },
            value: inputValues.goalDescription,
          }}
          error={errors["goalDescription"]}
        />
        <InputLabel
          style={styles.inputLabel}
          label="Completion Date"
          inputConfigs={{
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            onChangeText: (val) => {
              onChangeTextHandler("completionDate", val);
            },
            value: inputValues.completionDate,
          }}
          error={errors["completionDate"]}
        />
        <View style={styles.buttonContainer}>
          {!loading ? (
            <CustomButton onPress={onPressHandler}>
              {goalParams ? "Edit" : "Save"}
            </CustomButton>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  addNewGoalContainer: {
    flex: 1,
    position: "relative",

    alignItems: "center",
  },
  inputLabel: {
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#B43E43",
    width: 300,
    margin: "auto",
    height: 50,
    borderRadius: "100%",
    marginTop: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.4,
  },
});
export default AddNewGoal;
