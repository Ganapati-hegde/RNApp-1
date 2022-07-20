import axios from "axios";
const API_KEY = "AIzaSyAzj6nXsK-0r0M0vBjUU3_J6ZI2E6F_8To";

export const Auth = async (mode, email, password) => {
  const resp = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return resp;
};
