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

  sticky: boolean | undefined;
  subscribers: string[];
  menuLess?: boolean;
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

  subscribers,
  sticky,
  menuLess,
}: IBookmarkLikeMoreIconGroups) {
  return (
    <View style={styles.mainWrapper}>
      <View style={{ marginRight: menuLess ? -40 : 0 }}>
        <LikeIconButton
          itemLikes={itemLikes}
          likedProperty={likedProperty}
          itemId={itemId}
          userId={userId}
          queryName={queryName}
        />
      </View>

      <BookmarkIconButton
        itemId={itemId}
        bookmarkedProperty={bookmarkedProperty}
        userBookmarkedItems={userBookmarkedItems}
      />
      {!menuLess && (
        <PostStoryActionMenu
          itemId={itemId}
          itemCreatorId={itemCreatorId}
          itemEndpoint={itemEndpoint}
          userId={userId}
          subscribers={subscribers}
          sticky={sticky}
        />
      )}
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
