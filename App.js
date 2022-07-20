import { useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import LoginForm from "./components/LoginForm";
import BookList from "./components/BookList";
import Goals from "./Pages/Goals";
import AddNewGoal from "./Pages/AddNewGoal";
import SignUpForm from "./components/SignUpForm";
import AuthContextProvider, { AuthContext } from "./Utils/Store/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const AuthenticatedNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Goals"
          component={Goals}
          options={{ title: "Goals" }}
        />
        <Stack.Screen
          name="AddNewGoal"
          component={AddNewGoal}
          options={{ title: "Add Goal" }}
        />
      </Stack.Navigator>
    );
  };
  const AuthNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpForm"
          component={SignUpForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  const Root = () => {
    const authCtx = useContext(AuthContext);
    return (
      <NavigationContainer>
        {authCtx.isAuthenticated ? (
          <AuthenticatedNavigator />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    );
  };

  return (
    <>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flex: 1,
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
