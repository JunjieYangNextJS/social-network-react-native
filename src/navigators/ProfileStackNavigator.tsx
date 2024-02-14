import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../screens.js/Profile";
import { Stack } from "./RootStackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OtherUser from "../screens.js/OtherUser";
import Post from "../screens.js/Post";
import { Icon, IconButton } from "react-native-paper";
import FriendList from "../screens.js/Profile/FriendList";

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export type ProfileDrawerParamList = {
  Profile: {};
  FriendList: {};
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "rgb(39, 35, 41)",
        },
        // drawerIcon: ({ size, focused }) => {
        //   return <Icon source="menu" size={size} />;
        // },
        headerTintColor: "#D8D8D8",
        headerStyle: {
          shadowColor: "transparent", // this covers iOS
          elevation: 0, // this covers Android
        },
        drawerActiveTintColor: "#FFFFFF",
      }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="FriendList" component={FriendList} />

      {/* <Stack.Screen
    name="OtherUser"
    component={OtherUser}
    // options={() => ({ headerBackVisible: false })}
  /> */}
    </Drawer.Navigator>
  );
};

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="P_Drawer"
        component={DrawerNav}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="P_Post"
        component={Post}
        options={{ headerTitle: "Post" }}
      />
    </Stack.Navigator>
  );
}
