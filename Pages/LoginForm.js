import { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContent from "../components/Auth/AuthContent";

import { Auth } from "../Utils/requests/createUser";
import { AuthContext } from "../Utils/Store/AuthContext";

const LoginForm = () => {
  const AuthCtx = useContext(AuthContext);

  const [loader, setLoader] = useState(false);

  const onAuthenticate = async ({ email, password, confirmPassword }) => {
    setLoader(true);
    try {
      const resp = await Auth(
        "signInWithPassword",
        email,
        password,
        confirmPassword
      );
      AuthCtx.authenticate(resp.data.idToken);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setLoader(false);
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient colors={["#B43E43", "#8C4994"]} style={{ flex: 1 }}>
        <View style={styles.appContainer}>
          <AuthContent
            isLogin
            onAuthenticate={onAuthenticate}
            loader={loader}
          />
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
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
export default LoginForm;
