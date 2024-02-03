import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Stack } from "./RootStackNavigator";
import Chat from "../screens.js/Chat";

export default function ChatStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={() => ({ headerBackVisible: false })}
      />
    </Stack.Navigator>
  );
}
