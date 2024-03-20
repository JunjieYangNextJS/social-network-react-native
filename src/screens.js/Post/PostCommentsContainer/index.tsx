import { FlashList } from "@shopify/flash-list";
import React from "react";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { useQuery } from "@tanstack/react-query";
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
} from "react-native";
import PostCommentContainer from "./PostCommentContainer";
import { PostComment } from "../../../../types";
import { ActivityIndicator, Text } from "react-native-paper";

interface IPostComments {
  pinned: string | undefined;
  postId: string;
  sortByValue: string;
  userId: string;
  userBookmarkedPostComments?: string[];
  navigateToUserPage: (username: string, profileImage?: string) => void;
  postCommentScreenRoute: "PostComment" | "N_PostComment" | "P_PostComment";
}

export default function PostCommentsContainer({
  pinned,
  postId,
  sortByValue,
  userId,
  userBookmarkedPostComments,
  navigateToUserPage,
  postCommentScreenRoute,
}: IPostComments) {
  const fetchPostComments = async () => {
    const token = await getItemAsync("token");

    return axios
      .get(
        `${baseUrl}/postComments?post=${postId}&sort=${sortByValue}`,
        // `${baseUrl}/postComments?id[ne]=${pinned}&post=${postId}&sort=${sortByValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data.data.data as PostComment[]);
  };

  const { data } = useQuery({
    queryKey: ["post", postId, "comments", { sort: sortByValue }],
    queryFn: fetchPostComments,
  });

  if (!data) {
    return <ActivityIndicator />;
  }

  if (data.length === 0) {
    return null;
  }

  const renderPostItem = (itemData: any) => {
    return (
      <PostCommentContainer
        postComment={itemData.item}
        userId={userId}
        userBookmarkedPostComments={userBookmarkedPostComments}
        navigateToUserPage={navigateToUserPage}
        postCommentScreenRoute={postCommentScreenRoute}
      />
    );
  };

  // console.log(data?.[data.length - 9]?.postReplies, "yes");

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderPostItem}
        keyExtractor={(item: PostComment) => item._id}
        estimatedItemSize={data.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
    minHeight: 2,
    marginBottom: "11%",
  },
});
