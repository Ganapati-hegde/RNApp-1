import { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  authenticate: () => {},
  isAuthenticated: false,
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = async (token) => {
    setAuthToken(token);
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      // saving error
    }
  };
  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };
  const values = {
    token: authToken,
    authenticate: authenticate,
    isAuthenticated: !!authToken,
    logout: logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
