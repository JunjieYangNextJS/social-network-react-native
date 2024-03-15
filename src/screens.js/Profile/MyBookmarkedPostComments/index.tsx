import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlashList } from "@shopify/flash-list";

import { Post, PostComment } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import PostCommentContent from "../../Post/PostCommentsContainer/PostCommentContent";
import { useGetBookmarkedPostComments } from "../../../react-query-hooks/useUser/useGetBookmarked";
import { Text } from "react-native-paper";

type Props = NativeStackScreenProps<
  ProfileDrawerParamList,
  "MyBookmarkedPostComments"
>;

const MyBookmarkedPostComments = ({}: Props) => {
  const { data: postComments } = useGetBookmarkedPostComments();
  const parentNavigation = useNavigation().getParent();

  const renderPostItem = useCallback(
    (itemData: any) => {
      const item: PostComment = itemData.item;

      const navigateToPostComment = () => {
        parentNavigation?.navigate("P_PostComment", {
          postCommentId: item._id,
          postTitle: item.post.title,
        });
      };

      return (
        <View style={{ marginTop: 7 }}>
          <PostCommentContent
            postComment={item}
            userBookmarkedPostComments={[""]}
            userId=""
            withoutIconsGroup={true}
            navigateToPostComment={navigateToPostComment}
            navigateToUserPage={() => {}}
          />
        </View>
      );
    },
    [postComments]
  );

  if (!postComments) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (postComments.length < 1) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          You haven't bookmarked any comments.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={postComments}
        keyExtractor={(item: PostComment) => item._id}
        renderItem={renderPostItem}
        // contentContainerStyle={{ paddingTop: 10 }}
        estimatedItemSize={postComments.length}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default MyBookmarkedPostComments;
