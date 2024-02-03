import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Text,
  BottomNavigation,
  Icon,
  TouchableRipple,
  Avatar,
  Badge,
  ActivityIndicator,
} from "react-native-paper";

import theme, { useAppTheme } from "./../theme";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ChatStackNavigator from "./ChatStackNavigator";
import NotificationsStackNavigator from "./NotificationsStackNavigator";
import useUser from "../react-query-hooks/useUser/useUser";
import PostsStackNavigator from "./PostsStackNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import useGetWillNotifyNotifications from "../react-query-hooks/useNotifications/useGetWillNotifyNotifications";
import { View } from "react-native";
import { Stack } from "./RootStackNavigator";

import OtherUser from "../screens.js/OtherUser";
import OtherUserStackNavigator from "./OtherUserNavigator";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const theme = useAppTheme();
  const { data: user } = useUser();
  const { data: count } = useGetWillNotifyNotifications();

  if (!user || typeof count !== "number") return <ActivityIndicator />;

  const getNotiIcon = (focused: boolean, size: number, color: string) => {
    return (
      <View>
        <Badge
          size={14}
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            backgroundColor: "orange",
          }}
          visible={count > 0}
        >
          {count > 99 ? "99+" : count}
        </Badge>
        <Icon
          source={focused ? "bell" : "bell-outline"}
          size={size}
          color={color}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          // height: "7%",
          backgroundColor: theme.colors.elevation.level1,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
      initialRouteName="PostsStackNavigator"
    >
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "Profile",
          // tabBarStyle: { display: "none" },
          // tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size, focused }) => {
            return <Avatar.Image size={22} source={{ uri: user.photo }} />;
          },
        }}
      />
      <Tab.Screen
        name="PostsStackNavigator"
        component={PostsStackNavigator}
        options={({ route }) => ({
          tabBarLabel: "Community",
          // tabBarStyle: {
          //   display: (getTabBarVisibility(route) as any) || "none",
          // },
          // tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                source={focused ? "account-group" : "account-group-outline"}
                size={size}
                color={color}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="NotificationsStackNavigator"
        component={NotificationsStackNavigator}
        options={{
          tabBarLabel: "Notifications",
          // tabBarStyle: { display: "none" },
          // tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size, focused }) => {
            return getNotiIcon(focused, size, color);
          },
        }}
      />
      <Tab.Screen
        name="ChatStackNavigator"
        component={ChatStackNavigator}
        options={{
          tabBarLabel: "Chat",
          // tabBarStyle: { display: "none" },
          // tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                source={focused ? "chat-processing" : "chat-processing-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
