import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens.js/Authentication/Login";
import SignUp from "../screens.js/Authentication/SignUp";
import ForgotMyPassword from "../screens.js/Authentication/ForgotMyPassword";
import { Stack } from "./RootStackNavigator";

// export type AuthStackParamList = {
//   Login: any;
//   SignUp: any;
//   ForgotMyPassword: any;
// };

// const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: "Sign Up" }}
      />
      <Stack.Screen
        name="ForgotMyPassword"
        component={ForgotMyPassword}
        options={{ headerTitle: "Forgot Password" }}
      />
    </Stack.Navigator>
  );
}
