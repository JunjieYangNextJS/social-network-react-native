import { FlashList } from "@shopify/flash-list";
import React from "react";

import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
import { PostReply } from "../../../types";
import PostReplyContainer from "./PostReplyContainer";

interface IPostRepliesContainer {
  postReplies: PostReply[];
  userId: string;
  userUsername: string;
}

export default function PostRepliesContainer({
  postReplies,
  userId,
  userUsername,
}: IPostRepliesContainer) {
  const renderPostItem = (itemData: any) => {
    return (
      <PostReplyContainer
        postReply={itemData.item}
        userId={userId}
        userUsername={userUsername}
      />
    );
  };

  // console.log(data?.[data.length - 9]?.postReplies, "yes");

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={postReplies}
        renderItem={renderPostItem}
        keyExtractor={(item: PostReply) => item._id}
        estimatedItemSize={postReplies.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    minHeight: 2,
    marginBottom: "11%",
  },
});
