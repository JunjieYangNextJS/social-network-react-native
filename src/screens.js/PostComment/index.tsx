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

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PostComment" | "N_PostComment"
>;

export default function PostComment({ route, navigation }: Props) {
  const { postCommentId, postTitle } = route.params;

  const { data } = useGetPostComment(postCommentId);

  // console.log(data?.post.title, "data");
  const { data: user } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: postTitle || " ",
      // headerBackVisible: !!postTitle,
    });

    if (!postTitle) {
      navigation.setOptions({
        headerTitle: data?.post.title || " ",
        headerRight: () => (
          <Button
            onPress={() => {
              if (data)
                navigation.navigate("N_Post", {
                  postId: data.post._id,
                });
            }}
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

  const stackName = route.name;
  let userScreenRoute: "OtherUser" | "N_OtherUser";

  switch (stackName) {
    case "PostComment":
      userScreenRoute = "OtherUser";

      break;
    case "N_PostComment":
      userScreenRoute = "N_OtherUser";

      break;

    default:
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

  // const navigateToUserPage = () => {
  //   navigation.navigate("OtherUser", {
  //     username: replier.username,
  //     photo: replier.photo,
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <PostCommentContent
          postComment={data}
          userBookmarkedPostComments={user.bookmarkedPostComments}
          userId={user._id}
          withoutIconsGroup={true}
          navigateToPostComment={() => {}}
          navigateToUserPage={() =>
            navigateToUserPage(
              data.commenter.username,
              data.commenter.profileImage
            )
          }
        />
        <Divider />
        {data.postReplies.length > 0 && (
          <PostRepliesContainer
            postReplies={data.postReplies}
            userId={user._id}
            userUsername={user.username}
            navigateToUserPage={navigateToUserPage}
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
