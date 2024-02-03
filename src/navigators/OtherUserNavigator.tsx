import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import OtherUser from "../screens.js/OtherUser";

import { Stack } from "./RootStackNavigator";

export default function OtherUserStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="OtherUser"
        component={OtherUser}
        // options={() => ({ headerBackVisible: false })}
      />
    </Stack.Navigator>
  );
}
