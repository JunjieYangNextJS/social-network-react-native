import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { useCallback } from "react";
import PostCard from "../../Posts/PostCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { useGetMyPosts } from "../../../react-query-hooks/useUser/useGetMyCreations";
import { Post } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import { Text } from "react-native-paper";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "MyPosts">;

const MyPosts = ({}: Props) => {
  const { data: shownPosts } = useGetMyPosts();

  const renderPostItem = useCallback(
    (itemData: any) => {
      const item: Post = itemData.item;

      const postCardProps = {
        id: item._id,
        title: item.title,
        content: item.content,
        createdAt: item.createdAt,
        lastCommentedAt: item.lastCommentedAt,
        likes: item.likes,
        poll: item.poll,
        poster: item.poster,
        commentCount: item.commentCount,
        modFavored: item.modFavored,
        sticky: item.sticky,
        editedAt: item.editedAt,
        photoNotPressable: true,
        subscribers: item.subscribers,
      };

      return <PostCard {...postCardProps} />;
    },
    [shownPosts]
  );

  if (!shownPosts) {
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

  if (shownPosts.length < 1) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          You haven't created any posts.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={shownPosts}
        keyExtractor={(item: Post) => item._id}
        renderItem={renderPostItem}
        estimatedItemSize={shownPosts.length}
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

export default MyPosts;
