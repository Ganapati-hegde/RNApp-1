import axios from "axios";

export const UpdateGoal = async (
  id,
  goalName,
  goalDescription,
  completionDate
) => {
  const resp = await axios.put(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/createGoal/${id}.json`,
    {
      goalName: goalName,
      goalDescription: goalDescription,
      completionDate: completionDate,
      id: id,
    }
  );
  return resp;
};
