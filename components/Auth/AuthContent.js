import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  Pressable,
} from "react-native";

import Title from "../Title";

import ValidateForm from "../../Utils/validateForm";
import { CreateUser } from "../../Utils/requests/createUser";
import AuthForm from "./AuthForm";
import { useNavigation } from "@react-navigation/native";

const AuthContent = ({ isLogin, onAuthenticate, loader }) => {
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const formSubmitHandler = ({ email, password, confirmPassword }) => {
    const error = isLogin
      ? ValidateForm(email, password, null)
      : ValidateForm(email, password, confirmPassword);

    setErrors(error);
    if (Object.keys(error).length === 0) {
      onAuthenticate({
        email: email,
        password: password,
      });
    } else return;
    setErrors({});
  };
  const onPressHandler = () => {
    isLogin
      ? navigation.replace("SignUpForm")
      : navigation.replace("LoginForm");
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Title>WELCOME</Title>
      </View>
      <AuthForm
        submitHandler={formSubmitHandler}
        isLogin={isLogin}
        errors={errors}
        loader={loader}
      />

      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : "")}
        onPress={() => {
          onPressHandler();
        }}
      >
        <Text style={styles.createUser}>
          {isLogin ? "Create User" : "Login"}
        </Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 16,
  },

  activityIndicator: {
    // marginLeft: 150,
  },

  createUser: {
    marginVertical: 8,
    color: "#fff",
    fontFamily: "open-sans-bold",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.5,
  },
});
export default AuthContent;
