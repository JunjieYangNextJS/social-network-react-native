import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Notifications from "../screens.js/Notifications";

import { Stack } from "./RootStackNavigator";
import OtherUser from "../screens.js/OtherUser";
import Post from "../screens.js/Post";
import PostComment from "../screens.js/PostComment";
import ChatRoom from "../screens.js/ChatRoom";

export default function NotificationsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => ({ headerBackVisible: false })}
      />
      <Stack.Screen
        name="N_OtherUser"
        component={OtherUser}
        // options={{ gestureEnabled: false }}
        // options={() => ({ headerBackVisible: false })}
      />
      <Stack.Screen
        name="N_Post"
        component={Post}
        options={{ headerTitle: "Post" }}
      />
      <Stack.Screen name="N_PostComment" component={PostComment} />
      <Stack.Screen
        name="N_ChatRoom"
        component={ChatRoom}
        options={{ headerTitle: " " }}
      />
      {/* <Stack.Screen
        name="OtherUser"
        component={OtherUser}
        // options={() => ({ headerBackVisible: false })}
      /> */}
    </Stack.Navigator>
  );
}
