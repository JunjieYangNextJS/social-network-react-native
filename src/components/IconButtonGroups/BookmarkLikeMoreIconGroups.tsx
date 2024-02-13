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
  actionMenu?: any;
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
  actionMenu,
}: IBookmarkLikeMoreIconGroups) {
  return (
    <View style={styles.mainWrapper}>
      <View style={{ marginRight: !!actionMenu ? 0 : -40 }}>
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
      {!!actionMenu && actionMenu}
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
