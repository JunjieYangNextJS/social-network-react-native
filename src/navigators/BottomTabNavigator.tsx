import React, { useMemo } from "react";
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
import { Image } from "expo-image";

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const theme = useAppTheme();
  const { data: user } = useUser();
  const { data: count } = useGetWillNotifyNotifications();

  const allTotalUnread = useMemo(() => {
    if (!user) return 0;
    return user.chatRooms
      .map((chatRoom) =>
        chatRoom.users.find((target) => target.user._id === user.id)
      )
      .map((value) => value?.totalUnread)
      .reduce(
        (accumulator: any, currentValue) => accumulator + currentValue,
        0
      ) as number;
  }, [user?.chatRooms]);

  if (!user || typeof count !== "number") return <ActivityIndicator />;

  const getIconWithBadge = (
    source: string,
    size: number,
    color: string,
    count: number
  ) => {
    return (
      <View>
        <Badge
          size={14}
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            backgroundColor: "orange",
            zIndex: 10,
          }}
          visible={count > 0}
        >
          {count > 99 ? "99+" : count}
        </Badge>
        <Icon source={source} size={size} color={color} />
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
          tabBarLabel: "Home",
          // tabBarStyle: { display: "none" },
          // tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Avatar.Image
                size={23}
                source={() => (
                  <Image
                    source={{
                      uri: user.photo,
                    }}
                    style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
                  />
                )}
              />
            );
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
            return getIconWithBadge(
              focused ? "bell" : "bell-outline",
              size,
              color,
              count
            );
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
            return getIconWithBadge(
              focused ? "chat-processing" : "chat-processing-outline",
              size,
              color,
              allTotalUnread
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
