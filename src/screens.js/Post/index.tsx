import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import {
  ActivityIndicator,
  Divider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import usePost from "../../react-query-hooks/usePosts/usePost";
import PostContent from "./PostContent";
import useUser from "../../react-query-hooks/useUser/useUser";
import CommentBottomSheet from "../../components/BottomSheets/CommentBottomSheet";
import PostCommentsContainer from "./PostCommentsContainer";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { HeaderBackButton } from "@react-navigation/elements";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Post" | "N_Post" | "P_Post"
>;

export default function Post({ navigation, route }: Props) {
  const postId = route.params.postId;

  const { data: post, error } = usePost(postId);
  const { data: user } = useUser();

  if (error) {
    return <Text style={styles.error}>{error?.toString()}</Text>;
  }

  if (!post || !user) {
    return <ActivityIndicator />;
  }

  let userScreenRoute: "OtherUser" | "N_OtherUser" | "P_OtherUser";
  let postCommentScreenRoute: "PostComment" | "N_PostComment" | "P_PostComment";

  switch (route.name) {
    case "Post":
      userScreenRoute = "OtherUser";
      postCommentScreenRoute = "PostComment";
      break;
    case "N_Post":
      userScreenRoute = "N_OtherUser";
      postCommentScreenRoute = "N_PostComment";
      break;
    case "P_Post":
      userScreenRoute = "P_OtherUser";
      postCommentScreenRoute = "P_PostComment";
      break;

    default:
      userScreenRoute = "P_OtherUser";
      postCommentScreenRoute = "P_PostComment";

      break;
  }

  const navigateToUserPage = (
    username: string,
    profileImage: string | undefined
  ) => {
    navigation.navigate(userScreenRoute, {
      username,
      profileImage,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <PostContent
          post={post}
          userId={user._id}
          userHiddenPosts={user.hiddenPosts}
          userBookmarkedPosts={user.bookmarkedPosts}
          myVotes={user.myVotes}
          navigation={navigation}
          navigateToUserPage={navigateToUserPage}
        />
        <Divider />
        {/* use filter/ order bar as separator */}

        <PostCommentsContainer
          pinned={post.pinned}
          postId={post._id}
          sortByValue="createdAt"
          userId={user._id}
          userBookmarkedPostComments={user.bookmarkedPostComments}
          navigateToUserPage={navigateToUserPage}
          postCommentScreenRoute={postCommentScreenRoute}
        />
      </ScrollView>
      <CommentBottomSheet postId={postId} poster={post.poster._id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
  },
  error: {
    fontSize: 20,
    margin: 35,
    // marginTop: 35,
    // marginLeft: 35,
    lineHeight: 30,
  },
});
