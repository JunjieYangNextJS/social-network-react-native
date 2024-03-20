import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Searchbar, SegmentedButtons, Text } from "react-native-paper";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useSearchPosts } from "../../react-query-hooks/usePosts/useSearchPosts";
import { FlashList } from "@shopify/flash-list";
import { Post, User } from "../../../types";
import PostCard from "../Posts/PostCard";
import useSearchUsers from "../../react-query-hooks/useUser/useSearchUsers";
import UserInfoContainer from "../../components/UserInfoContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "PostsSearch">;

export default function PostsSearch({ navigation }: Props) {
  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced] = useDebouncedValue(searchQuery, 200);

  // segment
  const [value, setValue] = useState("posts");

  const { data: posts, refetch: refetchPosts } = useSearchPosts(
    debounced,
    value === "posts"
  );
  const { data: users, refetch } = useSearchUsers(debounced, value === "users");

  useFocusEffect(
    useCallback(() => {
      // Refetch data when the screen gains focus
      refetch();
      refetchPosts();
    }, []) // Empty dependency array ensures refetch on every focus
  );

  const renderPostItem = useCallback(
    (itemData: any) => {
      // const onPress = () => {
      //   navigation.navigate("Post")
      // }
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
    [posts]
  );

  const renderUserItem = useCallback(
    (itemData: any) => {
      const { username, profileName, photo, bio } = itemData.item as User;

      const navigateToUserPage = () => {
        // onSetPreviousScreen("Notifications");

        navigation.navigate("OtherUser", {
          username,
          profileImage: undefined,
        });
      };

      return (
        <View style={styles.itemContainer}>
          <UserInfoContainer
            username={username}
            profileName={profileName}
            navigateToUserPage={navigateToUserPage}
            photo={photo}
          />
          {bio && (
            <Text
              variant="bodyMedium"
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{ flex: 1, marginLeft: 20, maxWidth: 200 }}
            >
              {bio}
            </Text>
          )}
        </View>
      );
    },
    [users]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 10 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ height: 40, marginBottom: 10 }}
          inputStyle={{ minHeight: 0 }}
        />

        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "posts",
              label: "Posts",
            },
            {
              value: "users",
              label: "Users",
            },
          ]}
          density="small"
          style={{ marginHorizontal: 100 }}
        />
      </View>

      {posts && posts.length > 0 && value === "posts" && (
        <FlashList
          data={posts}
          keyExtractor={(item: Post) => item._id}
          renderItem={renderPostItem}
          estimatedItemSize={posts.length}
        />
      )}
      {users && users.length > 0 && value === "users" && (
        <FlashList
          data={users}
          keyExtractor={(item: User) => item._id}
          renderItem={renderUserItem}
          estimatedItemSize={users.length}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    marginHorizontal: 15,
    // justifyContent: "center",
  },
});
