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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <PostContent
          post={post}
          userId={user._id}
          userBookmarkedPosts={user.bookmarkedPosts}
          myVotes={user.myVotes}
          navigation={navigation}
        />
        <Divider />
        {/* use filter/ order bar as separator */}

        <PostCommentsContainer
          pinned={post.pinned}
          postId={post._id}
          sortByValue="createdAt"
          userId={user._id}
          userBookmarkedPostComments={user.bookmarkedPostComments}
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
