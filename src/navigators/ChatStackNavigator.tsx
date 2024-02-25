import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Stack } from "./RootStackNavigator";
import Chat from "../screens.js/Chat";
import ChatRoom from "../screens.js/Chat/ChatRoom";

export default function ChatStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={() => ({
          headerBackVisible: false,
          headerTitle: "Chats",
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerTitle: " " }}
      />
    </Stack.Navigator>
  );
}
