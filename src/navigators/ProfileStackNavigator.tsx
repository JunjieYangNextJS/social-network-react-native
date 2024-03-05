import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
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
import {
  Avatar,
  Icon,
  IconButton,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import FriendList from "../screens.js/Profile/FriendList";
import PostComment from "../screens.js/PostComment";
import UserInfoContainer from "../components/UserInfoContainer";
import useUser from "../react-query-hooks/useUser/useUser";
import { User } from "../../types";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Image, ImageBackground } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyPosts from "./../screens.js/Profile/MyPosts/index";
import MyPostComments from "../screens.js/Profile/MyPostComments.tsx";
import MyPostReplies from "../screens.js/Profile/MyPostReplies";
import useDialogStore from "../store/useDialogStore";
// import onLogout from "../react-query-hooks/useAuth/handleLogout";
import { useQueryClient } from "@tanstack/react-query";
import useToastStore from "../store/useToastStore";
import useUserTokenStore from "../store/useUserTokenStore";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import MyLikedPosts from "../screens.js/Profile/MyLikedPosts";
import MyBookmarkedPosts from "../screens.js/Profile/MyBookmarkedPosts";
import MyBookmarkedPostComments from "../screens.js/Profile/MyBookmarkedPostComments";
import HiddenPosts from "../screens.js/Profile/HiddenPosts";
import BlockedUsers from "../screens.js/Profile/BlockedUsers";
import Privacy from "../screens.js/Profile/Privacy";
import { useNavigation } from "@react-navigation/native";

import Securities from "../screens.js/Profile/Settings";
import ChatRoom from "../screens.js/ChatRoom";

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export type ProfileDrawerParamList = {
  Profile: {};
  FriendList: {};
  MyPosts: {};
  MyPostComments: { postCommentId: string; postTitle?: string };
  MyPostReplies: { postCommentId: string; postTitle?: string };
  MyLikedPosts: {};
  MyBookmarkedPosts: {};
  MyBookmarkedPostComments: { postCommentId: string; postTitle?: string };
  HiddenPosts: {};
  BlockedUsers: {};
  Privacy: {};
};

const CustomDrawer = (props: DrawerContentComponentProps & { user: User }) => {
  const { photo, profileName, username, followers, following } = props.user;
  const { onOpenDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const { onOpenToast } = useToastStore();
  const { setLogout } = useUserTokenStore();
  const parentNavigation = useNavigation().getParent();

  const onLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users/logout`);
      if (res.data.status === "success") {
        queryClient.removeQueries({ queryKey: ["user", { exact: true }] });
        await deleteItemAsync("token");
        setLogout();
        // parentNavigation?.navigate("Posts");
        onOpenToast("success", "Logout was successful");
      }
    } catch (err) {
      onOpenToast("error", "Logout failed");
    }
  };

  const handleLogout = () => {
    onOpenDialog("Log Out", "Are you sure you want to log out?", onLogout);
  };

  const navigateToSecurity = () => {
    parentNavigation?.navigate("Security");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ marginLeft: 15, marginBottom: 20, marginTop: 10 }}>
          <View style={styles.userInfoContainerWrapper}>
            <UserInfoContainer
              photo={photo}
              profileName={profileName}
              username={username}
              navigateToUserPage={() => {}}
            />
            <IconButton
              icon="cog-outline"
              size={20}
              style={{ marginRight: 10 }}
              iconColor={"#b3b3b3"}
              onPress={navigateToSecurity}
            />
          </View>

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
        onPress={handleLogout}
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
  const { width } = useWindowDimensions();
  const [fullSizeImgVisible, setFullSizeImgVisible] = useState(false);

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
      <Drawer.Screen
        name="MyPosts"
        component={MyPosts}
        options={{ headerTitle: "My Posts", drawerLabel: "My Posts" }}
      />
      <Drawer.Screen
        name="MyPostComments"
        component={MyPostComments}
        options={{
          headerTitle: "My Comments",
          drawerLabel: "My Comments",
        }}
      />
      <Drawer.Screen
        name="MyPostReplies"
        component={MyPostReplies}
        options={{
          headerTitle: "My Replies",
          drawerLabel: "My Replies",
        }}
      />
      <Drawer.Screen
        name="MyLikedPosts"
        component={MyLikedPosts}
        options={{
          headerTitle: "Liked Posts",
          drawerLabel: "Liked Posts",
        }}
      />
      <Drawer.Screen
        name="MyBookmarkedPosts"
        component={MyBookmarkedPosts}
        options={{
          headerTitle: "Bookmarked Posts",
          drawerLabel: "Bookmarked Posts",
        }}
      />
      <Drawer.Screen
        name="MyBookmarkedPostComments"
        component={MyBookmarkedPostComments}
        options={{
          headerTitle: "Bookmarked Comments",
          drawerLabel: "Bookmarked Comments",
        }}
      />
      <Drawer.Screen
        name="HiddenPosts"
        component={HiddenPosts}
        options={{
          headerTitle: "Hidden Posts",
          drawerLabel: "Hidden Posts",
        }}
      />
      <Drawer.Screen
        name="BlockedUsers"
        component={BlockedUsers}
        options={{
          headerTitle: "Blocked Users",
          drawerLabel: "Blocked Users",
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        // options={{
        //   headerTitle: "Blocked Users",
        //   drawerLabel: "Blocked Users",
        // }}
      />

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
      <Stack.Screen name="P_ChatRoom" component={ChatRoom} />

      <Stack.Screen name="P_PostComment" component={PostComment} />
      <Stack.Screen name="Security" component={Securities} />
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

  userInfoContainerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
