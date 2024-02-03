import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ActivityIndicator, Button, Divider, Text } from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/elements";
import useGetComment from "../../react-query-hooks/useGetComment";
import useGetPostComment from "../../react-query-hooks/usePostComments/useGetPostComment";
import useUser from "../../react-query-hooks/useUser/useUser";
import PostCommentContent from "../Post/PostCommentsContainer/PostCommentContent";
import PostRepliesContainer from "./PostRepliesContainer";
import ReplyBottomSheet from "../../components/BottomSheets/ReplyBottomSheet";
import { RootStackParamList } from "../../navigators/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PostComment">;

export default function PostComment({ route, navigation }: Props) {
  const { postCommentId, postTitle } = route.params;

  const { data } = useGetPostComment(postCommentId);

  // console.log(data?.post.title, "data");
  const { data: user } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: postTitle || " ",
      headerBackVisible: !!postTitle,
    });

    if (data && !postTitle) {
      navigation.setOptions({
        headerTitle: data.post.title,
        headerRight: () => (
          <Button
            onPress={() =>
              navigation.navigate("Post", {
                postId: data.post._id,
              })
            }
          >
            View
          </Button>
        ),
      });
    }
  }, [data, navigation, postTitle]);

  if (!data || !user) {
    return <ActivityIndicator />;
  }

  const navigateToUserPage = () => {
    navigation.navigate("OtherUser", {
      username: data.commenter.username,
      photo: data.commenter.photo,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <PostCommentContent
          postComment={data}
          userBookmarkedPostComments={user.bookmarkedPostComments}
          userId={user._id}
          withoutIconsGroup={true}
          navigateToPostComment={() => {}}
          navigateToUserPage={navigateToUserPage}
        />
        <Divider />
        {data.postReplies.length > 0 && (
          <PostRepliesContainer
            postReplies={data.postReplies}
            userId={user._id}
            userUsername={user.username}
          />
        )}
      </ScrollView>
      <ReplyBottomSheet postCommentId={postCommentId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
