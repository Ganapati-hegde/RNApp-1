import moment from "moment";

const ValidateGoalData = ({ goalName, goalDescription, completionDate }) => {
  let errors = {};
  if (goalName === "") {
    errors["goalName"] = "Goal name can not be empty";
  }
  if (goalDescription === "") {
    errors["goalDescription"] = "Goal description can not be empty";
  }
  if (completionDate === "") {
    errors["completionDate"] = "Goal completion date can not be empty";
  }
  if (completionDate !== "") {
    const dateFormat = moment(completionDate);
    const todaysDate = moment();
    const difference = dateFormat.diff(todaysDate, "days");

    if (isNaN(difference)) {
      errors["completionDate"] = "Enter valida date";
    }
    if (difference < 0) {
      errors["completionDate"] =
        "Completion date should not be less then today's date";
    }
  }
  return errors;
};
export default ValidateGoalData;
