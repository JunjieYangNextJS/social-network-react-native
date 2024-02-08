import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import Posts from "../screens.js/Posts";
import Post from "../screens.js/Post";
import PostComment from "../screens.js/PostComment";
import { RootStackParamList, Stack } from "./RootStackNavigator";
import OtherUser from "../screens.js/OtherUser";

import PostCreate from "../screens.js/PostCreate";
import PostsSearch from "../screens.js/PostsSearch";
import PostHeaderRight from "../screens.js/Posts/PostHeaderRight";
import DraftsOpenButton from "../components/Buttons/DraftsOpenButton";
import PostDraft from "../screens.js/PostDraft";

export default function PostsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Group>
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={({
            navigation,
          }: {
            navigation: NativeStackNavigationProp<
              RootStackParamList,
              "Post",
              undefined
            >;
          }) => ({
            headerBackVisible: false,
            headerRight: () => <PostHeaderRight navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{ headerTitle: "Post" }}
        />
        <Stack.Screen name="PostComment" component={PostComment} />
        <Stack.Screen
          name="PostCreate"
          component={PostCreate}
          options={{
            headerTitle: "Create",
            headerRight: () => <DraftsOpenButton />,
          }}
        />
        <Stack.Screen
          name="PostDraft"
          component={PostDraft}
          options={{
            headerTitle: "Draft",
            headerRight: () => <DraftsOpenButton />,
          }}
        />
        <Stack.Screen
          name="PostsSearch"
          component={PostsSearch}
          options={{ headerTitle: "Search" }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="OtherUser"
          component={OtherUser}
          // options={{ gestureEnabled: false }}
          // options={() => ({ headerBackVisible: false })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
