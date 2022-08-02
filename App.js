import { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "@expo-google-fonts/inter";
import { Feather } from "@expo/vector-icons";
import AuthContextProvider from "./Utils/Store/AuthContext";
import { AuthContext } from "./Utils/Store/AuthContext";
import setNotificationConfig from "./NotificationsUtils/setNotificationConfig";
import Goals from "./Pages/Goals";
import Notifications from "./Pages/Notifications";
import LoginForm from "./Pages/LoginForm";
import SignUpForm from "./Pages/SignUpForm";
import { NavigationContainer } from "@react-navigation/native";
import AddNewGoal from "./Pages/AddNewGoal";
import PageLoader from "./components/PageLoader";
import AppLoading from "expo-app-loading";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

setNotificationConfig();

const getOptions = (
  tabName,
  activeColor,
  inActiveColor,
  iconName,
  headerShown
) => {
  return {
    tabBarLabel: tabName,
    activeColor: activeColor,
    inactiveColor: inActiveColor,
    headerShown: headerShown,
    tabBarIcon: ({ focused }) => {
      return (
        <Feather
          name={iconName}
          size={24}
          color={focused ? activeColor : inActiveColor}
        />
      );
    },
  };
};

const GoalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Goals" component={Goals}></Stack.Screen>
      <Stack.Screen name="AddNewGoal" component={AddNewGoal}></Stack.Screen>
    </Stack.Navigator>
  );
};
const NotificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
      ></Stack.Screen>
      <Stack.Screen name="Goals" component={Goals}></Stack.Screen>
      <Stack.Screen name="AddNewGoal" component={AddNewGoal}></Stack.Screen>
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#B43E43",
          height: 50,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <Tab.Screen
        name="GoalsStack"
        component={GoalStack}
        options={getOptions("Goals", "#fff", "#A9A9A9", "target", false)}
      ></Tab.Screen>
      <Tab.Screen
        name="NotificationsStack"
        component={NotificationStack}
        options={getOptions("Notifications", "#fff", "#A9A9A9", "bell", false)}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginForm"
        component={LoginForm}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

function Root() {
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTokenLoading(false);
    }

    fetchToken();
  }, []);

  if (isTokenLoading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
});
