import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect, useState } from "react";
import {
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

type Props = NativeStackScreenProps<RootStackParamList, "Post" | "N_Post">;

export default function Post({ navigation, route }: Props) {
  const postId = route.params.postId;

  const { data: post } = usePost(postId);
  const { data: user } = useUser();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerBackTitle: "Posts",
  //     headerLeft: (props) => (
  //       <HeaderBackButton
  //         {...props}
  //         onPress={() => {
  //           navigation.navigate("Posts");
  //         }}
  //       />
  //     ),
  //   });
  // }, []);

  if (!post || !user) {
    return <ActivityIndicator />;
  }

  let userScreenRoute: "OtherUser" | "N_OtherUser";
  let postCommentScreenRoute: "PostComment" | "N_PostComment";

  switch (route.name) {
    case "Post":
      userScreenRoute = "OtherUser";
      postCommentScreenRoute = "PostComment";
      break;
    case "N_Post":
      userScreenRoute = "N_OtherUser";
      postCommentScreenRoute = "N_PostComment";
      break;

    default:
      postCommentScreenRoute = "PostComment";
      null;
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
    marginTop: StatusBar.currentHeight || 0,
  },
});
