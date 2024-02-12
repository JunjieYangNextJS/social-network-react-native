import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../screens.js/Profile";
import { Stack } from "./RootStackNavigator";
import OtherUser from "../screens.js/OtherUser";
import Post from "../screens.js/Post";

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={() => ({ headerBackVisible: false })}
      />
      <Stack.Screen
        name="P_Post"
        component={Post}
        options={{ headerTitle: "Post" }}
      />
      {/* <Stack.Screen
        name="OtherUser"
        component={OtherUser}
        // options={() => ({ headerBackVisible: false })}
      /> */}
    </Stack.Navigator>
  );
}
