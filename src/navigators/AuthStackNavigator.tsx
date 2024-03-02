import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens.js/Authentication/Login";
import SignUp from "../screens.js/Authentication/SignUp";

export type AuthStackParamList = {
  Login: any;
  SignUp: any;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: "Sign Up" }}
      />
    </Stack.Navigator>
  );
}
