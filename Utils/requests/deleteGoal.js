import axios from "axios";

export const DeleteGoal = async (id) => {
  const resp = await axios.delete(
    `https://rnapp-414cc-default-rtdb.firebaseio.com/createGoal/${id}.json`
  );
  return resp;
};
