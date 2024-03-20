import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
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
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PostComment" | "N_PostComment" | "P_PostComment"
>;

export default function PostComment({ route, navigation }: Props) {
  const { postCommentId, postTitle } = route.params;

  const { data, refetch } = useGetPostComment(postCommentId);

  // console.log(data?.post.title, "data");
  const { data: user, refetch: refetchUser } = useUser();

  useFocusEffect(
    useCallback(() => {
      refetchUser();
      // Refetch data when the screen gains focus
      refetch();
    }, []) // Empty dependency array ensures refetch on every focus
  );

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
              if (data) navigateToPost();
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
  let userScreenRoute: any;
  let postScreenRoute: "Post" | "N_Post" | "P_Post";

  switch (stackName) {
    case "PostComment":
      userScreenRoute = "OtherUser";
      postScreenRoute = "Post";

      break;
    case "N_PostComment":
      userScreenRoute = "N_OtherUser";
      postScreenRoute = "N_Post";
      break;
    case "P_PostComment":
      userScreenRoute = "P_OtherUser";
      postScreenRoute = "P_Post";
      break;

    default:
      null;
      break;
  }

  const navigateToPost = () => {
    navigation.navigate(postScreenRoute, {
      postId: data.post._id,
    });
  };

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
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
  },
});
