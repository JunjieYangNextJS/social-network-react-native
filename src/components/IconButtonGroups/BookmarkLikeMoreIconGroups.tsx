import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Tooltip } from "react-native-paper";
import LikeIconButton from "../IconButtons/LikeIconButton";
import BookmarkIconButton from "../IconButtons/BookmarkIconButton";
import PostStoryActionMenu from "../Menus/PostStoryActionMenu";
import { BackendRoutes } from "../../../types";

interface IBookmarkLikeMoreIconGroups {
  userId: string;
  itemId: string;
  itemLikes: string[];
  queryName: string[];
  likedProperty: string;
  bookmarkedProperty: string;
  userBookmarkedItems?: string[];
  itemCreatorId: string;
  itemEndpoint: BackendRoutes;
  handleDeleteItem: (item: string) => void;
  deleteStatus: "pending" | "success" | "error" | "idle";
  sticky: boolean | undefined;
}

export default function BookmarkLikeMoreIconGroups({
  userId,
  itemId,
  itemLikes,
  queryName,
  likedProperty,
  bookmarkedProperty,
  userBookmarkedItems,
  itemCreatorId,
  itemEndpoint,
  handleDeleteItem,
  deleteStatus,
  sticky,
}: IBookmarkLikeMoreIconGroups) {
  return (
    <View style={styles.mainWrapper}>
      <LikeIconButton
        itemLikes={itemLikes}
        likedProperty={likedProperty}
        itemId={itemId}
        userId={userId}
        queryName={queryName}
      />
      <BookmarkIconButton
        itemId={itemId}
        bookmarkedProperty={bookmarkedProperty}
        userBookmarkedItems={userBookmarkedItems}
      />
      <PostStoryActionMenu
        itemId={itemId}
        itemCreatorId={itemCreatorId}
        itemEndpoint={itemEndpoint}
        userId={userId}
        handleDeleteItem={handleDeleteItem}
        deleteStatus={deleteStatus}
        sticky={sticky}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 130,
  },
});
