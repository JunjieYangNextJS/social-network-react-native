import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../screens.js/Profile";
import { Stack } from "./RootStackNavigator";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerToggleButton,
  DrawerItem,
} from "@react-navigation/drawer";

import OtherUser from "../screens.js/OtherUser";
import Post from "../screens.js/Post";
import { Avatar, Icon, IconButton, Text } from "react-native-paper";
import FriendList from "../screens.js/Profile/FriendList";
import PostComment from "../screens.js/PostComment";
import UserInfoContainer from "../components/UserInfoContainer";
import useUser from "../react-query-hooks/useUser/useUser";
import { User } from "../../types";
import { StyleSheet, View } from "react-native";
import { Image, ImageBackground } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export type ProfileDrawerParamList = {
  Profile: {};
  FriendList: {};
};

const CustomDrawer = (props: DrawerContentComponentProps & { user: User }) => {
  const { photo, profileName, username, followers, following } = props.user;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ marginLeft: 15, marginBottom: 20, marginTop: 10 }}>
          <UserInfoContainer
            photo={photo}
            profileName={profileName}
            username={username}
            navigateToUserPage={() => {}}
          />
          <View style={styles.textWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.number}>{following.length}</Text>
              <Text style={[styles.text, { marginRight: 18 }]}>Following</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.number}>{followers.length}</Text>
              <Text style={styles.text}>Followers</Text>
            </View>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="Logout"
        onPress={() => {}}
        icon={({ size, color }) => (
          <View style={{ marginRight: -24 }}>
            <Icon source="logout" size={size} color={color} />
          </View>
        )}
        style={{ marginBottom: 15 }}
      />
    </View>
  );
};

const DrawerNav = () => {
  const { data: user } = useUser();
  const { top: statusBarHeight } = useSafeAreaInsets();
  if (!user) return null;
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} user={user} />}
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
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => (
            <ImageBackground
              source={{
                uri: user?.profileImage,
              }}
              style={{ height: 160 }}
            >
              <View
                style={{
                  // probably some styling needed
                  marginTop: statusBarHeight,
                  // borderWidth: 1,
                  // padding: 5,
                  // borderRadius: 100,
                  // width: 50,
                  // height: 50,
                }}
              >
                <DrawerToggleButton tintColor="#fff" />
              </View>

              <Avatar.Image
                size={100}
                source={() => (
                  <Image
                    source={{
                      uri: user?.photo,
                    }}
                    style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
                  />
                )}
                style={styles.avatar}
              />
            </ImageBackground>
          ),
        }}
      />
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
      <Stack.Screen
        name="P_OtherUser"
        component={OtherUser}
        // options={{ gestureEnabled: false }}
        // options={() => ({ headerBackVisible: false })}
      />

      <Stack.Screen name="P_PostComment" component={PostComment} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    marginLeft: 2,
    color: "#b3b3b3",
  },
  number: {
    marginTop: 5,
    marginRight: 2,
    marginLeft: 2,
    fontWeight: "500",
  },
  avatar: {
    position: "absolute",
    marginTop: 110,
    marginLeft: 10,
  },
});
