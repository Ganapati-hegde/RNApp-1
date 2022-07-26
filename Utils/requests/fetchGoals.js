import axios from "axios";

export const FetchGoals = async () => {
  const resp = await axios.get(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/createGoal.json`
  );
  const goals = [];
  for (const key in resp.data) {
    const goalObj = {
      id: key,
      goalName: resp.data[key].goalName,
      goalDescription: resp.data[key].goalDescription,
      completionDate: resp.data[key].completionDate,
    };
    goals.push(goalObj);
  }
  return goals;
};
