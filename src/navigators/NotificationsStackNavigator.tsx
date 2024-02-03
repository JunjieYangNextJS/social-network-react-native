import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Notifications from "../screens.js/Notifications";

import { Stack } from "./RootStackNavigator";
import OtherUser from "../screens.js/OtherUser";

export default function NotificationsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => ({ headerBackVisible: false })}
      />
      {/* <Stack.Screen
        name="OtherUser"
        component={OtherUser}
        // options={() => ({ headerBackVisible: false })}
      /> */}
    </Stack.Navigator>
  );
}
