import { useState, createContext } from "react";

export const AuthContext = createContext({
  token: "",
  authenticate: () => {},
  isAuthenticated: false,
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
  };
  const logout = () => {
    setAuthToken(null);
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
