import { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Alert } from "react-native";
import AuthContent from "./AuthContent";
import { AuthContext } from "../Utils/Store/AuthContext";
import { Auth } from "../Utils/requests/createUser";

const SignUpForm = () => {
  const AuthCtx = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const onAuthenticate = async ({ email, password }) => {
    setLoader(true);
    try {
      const resp = await Auth("signUp", email, password);
      AuthCtx.authenticate(resp.data.idToken);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could Create user. Please check your credentials or try again later!"
      );
      setLoader(false);
    }
  };
  return (
    <LinearGradient colors={["#B43E43", "#8C4994"]} style={{ flex: 1 }}>
      <View style={styles.appContainer}>
        <AuthContent onAuthenticate={onAuthenticate} loader={loader} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignUpForm;
