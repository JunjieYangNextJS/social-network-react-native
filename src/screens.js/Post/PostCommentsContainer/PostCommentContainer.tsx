import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PostCommentContent from "./PostCommentContent";
import { PostComment } from "../../../../types";
import PostReplyContent from "./PostReplyContent";
import { List } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useReplyBottomSheetStore from "../../../store/useReplyBottomSheetStore";
import { RootStackParamList } from "../../../navigators/RootStackNavigator";

interface IPostCommentContainer {
  postComment: PostComment;
  userBookmarkedPostComments?: string[];
  userId: string;
  navigateToUserPage: (username: string, profileImage?: string) => void;
  postCommentScreenRoute: "PostComment" | "N_PostComment" | "P_PostComment";
}

export default function PostCommentContainer({
  postComment,
  userBookmarkedPostComments,
  userId,
  navigateToUserPage,
  postCommentScreenRoute,
}: IPostCommentContainer) {
  const replies = useMemo(() => {
    if (!postComment.postReplies || postComment.postReplies.length < 1)
      return null;

    return postComment.postReplies.slice(0, 3);
  }, [postComment]);

  // const route = useRoute();
  // const stackName = route.name;
  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "Post" | "N_Post" | "P_Post",
    undefined
  >;

  const { setWillReply } = useReplyBottomSheetStore();

  const navigateToPostComment = (willReply: boolean) => {
    setWillReply(willReply);

    navigation.navigate(postCommentScreenRoute, {
      postCommentId: postComment._id,
      postTitle: postComment.post.title,
    });
  };

  // console.log(postComment);
  return (
    <View>
      <PostCommentContent
        postComment={postComment}
        userBookmarkedPostComments={userBookmarkedPostComments}
        userId={userId}
        navigateToPostComment={navigateToPostComment}
        navigateToUserPage={() =>
          navigateToUserPage(
            postComment.commenter.username,
            postComment.commenter.profileImage
          )
        }
      />

      <View style={styles.list}>
        <Pressable onPress={() => navigateToPostComment(false)}>
          <List.Section>
            {replies &&
              replies.map((reply) => (
                <PostReplyContent
                  reply={reply}
                  key={reply._id}
                  navigation={navigation}
                  navigateToUserPage={navigateToUserPage}
                />
              ))}
          </List.Section>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: -8,
    marginBottom: 8,
  },
});
