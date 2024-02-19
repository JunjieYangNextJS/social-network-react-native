import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PostCard from "../../Posts/PostCard";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlashList } from "@shopify/flash-list";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "../../../navigators/RootStackNavigator";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMyPosts } from "../../../react-query-hooks/useUser/useGetMyCreations";
import { Post } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "MyPosts">;

const MyPosts = ({}: Props) => {
  const {
    data: shownPosts,
    isSuccess,
    refetch: refetchPosts,
  } = useGetMyPosts();

  if (!shownPosts) {
    return <ActivityIndicator />;
  }

  const renderPostItem = (itemData: any) => {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shownPosts}
        keyExtractor={(item: Post) => item._id}
        renderItem={renderPostItem}
        // estimatedItemSize={shownPosts.length}
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
