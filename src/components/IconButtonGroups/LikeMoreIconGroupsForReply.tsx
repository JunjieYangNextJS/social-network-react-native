import React from "react";
import LikeIconButton from "../IconButtons/LikeIconButton";
import { StyleSheet, View } from "react-native";
import ReplyActionMenu from "../Menus/ReplyActionMenu";
import { BackendRoutes } from "../../../types";
import ReplyLikeIconButton from "../IconButtons/ReplyLikeIconButton";

interface IBookmarkLikeMoreIconGroups {
  userId: string;
  itemId: string;
  itemLikes: string[];
  queryName: string[];
  likedProperty: string;
  itemCreatorId: string;
  itemEndpoint: BackendRoutes;
  handleDeleteItem: (item: string) => void;
  deleteStatus: "pending" | "success" | "error" | "idle";
}

export default function LikeMoreIconGroupsForReply({
  userId,
  itemId,
  itemLikes,
  queryName,
  likedProperty,
  itemCreatorId,
  itemEndpoint,
  handleDeleteItem,
  deleteStatus,
}: IBookmarkLikeMoreIconGroups) {
  return (
    <View style={styles.mainWrapper}>
      <ReplyLikeIconButton
        itemLikes={itemLikes}
        itemId={itemId}
        userId={userId}
        itemEndpoint={itemEndpoint}
        queryName={queryName}
      />
      <ReplyActionMenu
        itemId={itemId}
        itemCreatorId={itemCreatorId}
        itemEndpoint={itemEndpoint}
        userId={userId}
        handleDeleteItem={handleDeleteItem}
        deleteStatus={deleteStatus}
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
    width: 95,
  },
});
