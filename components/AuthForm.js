import { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "./Input";
import ErrorText from "./ErrorText";
import CustomButton from "./CustomButton";

const AuthForm = ({ submitHandler, isLogin, errors, loader }) => {
  const [email, setEmail] = useState("t1@t.com");
  const [password, setPassword] = useState("Abc@1234");
  const [confirmPassword, setConfirmPassword] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEmail(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
      case "confirmPassword":
        setConfirmPassword(enteredValue);
        break;
    }
  }
  const loginButtonHandler = () => {
    submitHandler({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={20}
          color="black"
          style={styles.iconStyle}
        />
        <Input
          placeholder="Email"
          inputText={email}
          setInputText={updateInputValueHandler.bind(this, "email")}
          value={email}
        />
      </View>
      <ErrorText>{errors?.email}</ErrorText>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="lock"
          size={20}
          color="black"
          style={styles.iconStyle}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          inputText={password}
          setInputText={updateInputValueHandler.bind(this, "password")}
          value={password}
        />
      </View>
      <ErrorText>{errors?.password}</ErrorText>

      {!isLogin && (
        <>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="lock"
              size={20}
              color="black"
              style={styles.iconStyle}
            />
            <Input
              placeholder="Confirm Password"
              secureTextEntry
              inputText={confirmPassword}
              setInputText={updateInputValueHandler.bind(
                this,
                "confirmPassword"
              )}
              value={password}
            />
          </View>
          <ErrorText>{errors?.confirmPassword}</ErrorText>
        </>
      )}

      {!loader ? (
        <CustomButton
          style={styles.buttonContainer}
          loginButtonHandler={loginButtonHandler}
        >
          {isLogin ? "LOGIN" : "Sign Up"}
        </CustomButton>
      ) : (
        <View style={styles.buttonContainer}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 16,
    width: 300,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: "100%",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderColor: "#FAE5E5",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    position: "relative",
    backgroundColor: "#F30157",
    width: 300,
    textAlign: "center",
    padding: 16,
    borderRadius: "100%",
    marginTop: 32,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconStyle: {
    paddingLeft: 8,
    paddingRight: 16,
    width: 50,
    textAlign: "center",
  },
});
export default AuthForm;
