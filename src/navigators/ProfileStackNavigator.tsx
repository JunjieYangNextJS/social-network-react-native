import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../screens.js/Profile";
import { Stack } from "./RootStackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OtherUser from "../screens.js/OtherUser";
import Post from "../screens.js/Post";

const Drawer = createDrawerNavigator();

export default function ProfileStackNavigator() {
  const FeedDrawer = () => {
    return (
      <Stack.Group>
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
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator screenOptions={{}}>
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={FeedDrawer} />
      </Drawer.Navigator>

      {/* <Stack.Screen
        name="OtherUser"
        component={OtherUser}
        // options={() => ({ headerBackVisible: false })}
      /> */}
    </Stack.Navigator>
  );
}
