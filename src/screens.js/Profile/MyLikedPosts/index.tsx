import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";

import { useCallback, useEffect, useMemo, useState } from "react";

import PostCard from "../../Posts/PostCard";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlashList } from "@shopify/flash-list";

import { Post } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import { useGetLikedPosts } from "../../../react-query-hooks/useUser/useGetLiked";
import { Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "MyLikedPosts">;

const MyLikedPosts = ({}: Props) => {
  const { data: shownPosts, refetch } = useGetLikedPosts();

  useFocusEffect(
    useCallback(() => {
      // Refetch data when the screen gains focus
      refetch();
    }, []) // Empty dependency array ensures refetch on every focus
  );

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
          You haven't liked any posts.
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
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
  },
});

export default MyLikedPosts;
