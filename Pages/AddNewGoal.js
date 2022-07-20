import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "../components/Button";
import InputLabel from "../components/InputLabel";

const AddNewGoal = ({ navigation }) => {
  const [inputValues, setInputValues] = useState({
    goalName: "",
    goalDescription: "",
    completionDate: "",
  });
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#B43E43",
      },
      headerTintColor: "#fff",
    });
  }, []);

  const onChangeTextHandler = (type, enteredVal) => {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [type]: enteredVal,
      };
    });
  };
  const onPressHandler = () => {
    let errors = {};

    if (inputValues.goalName === "") {
      errors["goalName"] = "Goal name can not be empty";
    }
    if (inputValues.goalDescription === "") {
      errors["goalDescription"] = "Goal description can not be empty";
    }
    if (inputValues.completionDate === "") {
      errors["completionDate"] = "Goal completion date can not be empty";
    }
    setErrors(errors);
  };
  return (
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
          placeholder: "YYYY-MM-DD",
          onChangeText: (val) => {
            onChangeTextHandler("completionDate", val);
          },
          value: inputValues.completionDate,
        }}
        error={errors["completionDate"]}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={onPressHandler}>Save</Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  addNewGoalContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
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
    padding: 16,
    borderRadius: "100%",
    marginTop: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default AddNewGoal;
