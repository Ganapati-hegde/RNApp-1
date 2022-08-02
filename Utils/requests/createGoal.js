import axios from "axios";

export const CreateGoal = async (
  id,
  goalName,
  goalDescription,
  completionDate,
  token
) => {
  const resp = await axios.post(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/createGoal.json?auth=${token}`,
    {
      goalName: goalName,
      goalDescription: goalDescription,
      completionDate: completionDate,
    }
  );
  return resp;
};
