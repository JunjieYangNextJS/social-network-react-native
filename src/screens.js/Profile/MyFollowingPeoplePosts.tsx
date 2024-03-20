import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { usePosts } from "../../react-query-hooks/usePosts/usePosts";
import { useCallback, useEffect, useMemo, useState } from "react";

import PostCard from "../Posts/PostCard";
import {
  OtherUser,
  Post,
  PostFilterAbout,
  SortByValue,
  User,
} from "../../../types";
import useUser from "../../react-query-hooks/useUser/useUser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlashList } from "@shopify/flash-list";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { useMyFollowingPeoplePosts } from "../../react-query-hooks/useUser/useMyFollowingPeoplePosts";
import { useFocusEffect } from "@react-navigation/native";

//   type Props = NativeStackScreenProps<RootStackParamList, "Posts">;

interface IMyFollowingPeoplePosts {
  user: User;
}

const MyFollowingPeoplePosts = ({ user }: IMyFollowingPeoplePosts) => {
  const { data: posts, isSuccess, refetch } = useMyFollowingPeoplePosts();
  const { height } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      // Refetch data when the screen gains focus
      refetch();
    }, []) // Empty dependency array ensures refetch on every focus
  );

  const shownPosts = useMemo(() => {
    if (!posts) return;
    const filtered = posts.filter(
      (post: Post) => !user.hiddenPosts.includes(post._id)
    );

    return filtered;
  }, [posts, user]);

  if (!posts || !shownPosts) {
    return <ActivityIndicator />;
  }

  if (posts.length < 1) {
    return null;
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
      userId: user._id,
      userBookmarkedPosts: user.bookmarkedPosts,
      subscribers: item.subscribers,
    };

    return <PostCard {...postCardProps} />;
  };

  // console.log(shownPosts, "shown");

  // useEffect(() => {
  //   if (!shownPosts) {
  //     SplashScreen.preventAutoHideAsync();
  //   }

  //   SplashScreen.hideAsync();
  // }, [shownPosts]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 5,
        minHeight: height - 210,
      }}
    >
      <FlashList
        data={shownPosts}
        keyExtractor={(item: Post) => item._id}
        renderItem={renderPostItem}
        estimatedItemSize={shownPosts.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
});

export default MyFollowingPeoplePosts;
