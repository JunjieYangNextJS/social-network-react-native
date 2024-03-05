import React, { useState } from "react";
import {
  View,
  Text as NativeText,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Menu,
  Text,
} from "react-native-paper";

import { PostReply } from "../../../types";
import calcTimeAgo from "../../utils/calcTimeAgo";
import LikeMoreIconGroupsForReply from "../../components/IconButtonGroups/LikeMoreIconGroupsForReply";
import { openURL } from "expo-linking";
import useDeletePostReply from "./../../react-query-hooks/usePostReplies/useDeletePostReply";

import useReplyBottomSheetStore from "../../store/useReplyBottomSheetStore";
import injectHTMLViewStyle from "../../utils/injectHTMLViewStyles";
import PressableAvatar from "../../components/PressableAvatar";

import RenderHTML from "react-native-render-html";

interface IPostReplyContainer {
  postReply: PostReply;
  userId?: string;
  userUsername: string;
  navigateToUserPage: (
    username: string,
    profileImage: string | undefined
  ) => void;
  navigateToPostComment?: () => void;
}

export default function PostReplyContainer({
  postReply,
  userId,
  userUsername,
  navigateToUserPage,
  navigateToPostComment,
}: IPostReplyContainer) {
  const {
    _id: id,
    post,
    content,
    createdAt,
    likes,
    replier,
    commenter,
    editedAt,
    postComment,
  } = postReply;

  const { width } = useWindowDimensions();

  const { mutate: handleDeleteItem, status } = useDeletePostReply(
    post._id,
    postComment
  );

  const { setWillReply, setReplyTo } = useReplyBottomSheetStore();

  const handleReplyToUsername = () => {
    if (userUsername !== replier.username) setReplyTo(replier.username);
    setWillReply(true);
  };

  return (
    <>
      {userId ? (
        <Card style={styles.card}>
          <View style={styles.wrapper}>
            <Card.Title
              title={replier.profileName}
              titleNumberOfLines={5}
              titleStyle={styles.profileName}
              subtitle={
                calcTimeAgo(createdAt) + (!!editedAt ? "  (edited)" : "")
              }
              subtitleStyle={styles.timeAgo}
              left={(props) => (
                <PressableAvatar
                  photo={replier.photo}
                  size={42}
                  navigateToUserPage={() =>
                    navigateToUserPage(replier.username, replier.profileImage)
                  }
                />
              )}
            />
            <Card.Content>
              <View style={styles.content}>
                {/* <HTMLView
                  value={content}
                  nodeComponentProps={{ selectable: true }}
                  stylesheet={HTMLViewStyles}
                  onLinkPress={(url) => {
                    openURL(url)
                      .then((result) => {
                        console.log("Link opened successfully:", result);
                      })
                      .catch((error) => {
                        console.error("Error opening link:", error);
                      });
                  }}
                /> */}
                <RenderHTML
                  source={{
                    html: content,
                  }}
                  contentWidth={width}
                  tagsStyles={tagsStyles}
                  renderersProps={{
                    img: {
                      enableExperimentalPercentWidth: true,
                    },
                  }}
                  enableExperimentalMarginCollapsing={true}
                  enableExperimentalBRCollapsing={true}
                  enableExperimentalGhostLinesPrevention={true}
                  defaultTextProps={{ selectable: true }}
                  // renderers={{
                  //   img: CustomImageRenderer,
                  // }}
                />
              </View>
            </Card.Content>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <IconButton
                icon="message-reply-text-outline"
                size={16}
                // color="#c4c4c2"
                // state update for bottomsheet to
                onPress={handleReplyToUsername}
              />
            </View>

            <View style={styles.actionsGroup}>
              <LikeMoreIconGroupsForReply
                userId={userId}
                itemId={id}
                itemLikes={likes}
                queryName={["postComment", postComment]}
                likedProperty="likedPostReplies"
                itemCreatorId={replier._id}
                itemEndpoint="postReplies"
                handleDeleteItem={handleDeleteItem}
                deleteStatus={status}
              />
            </View>
          </View>
        </Card>
      ) : (
        <Card style={styles.card} onPress={navigateToPostComment}>
          <View style={styles.wrapper}>
            <Card.Title
              title={replier.profileName}
              titleNumberOfLines={5}
              titleStyle={styles.profileName}
              subtitle={
                calcTimeAgo(createdAt) + (!!editedAt ? "  (edited)" : "")
              }
              subtitleStyle={styles.timeAgo}
              left={(props) => (
                <PressableAvatar
                  photo={replier.photo}
                  size={42}
                  navigateToUserPage={() => {}}
                />
              )}
            />
            <Card.Content>
              <View style={styles.content}>
                <RenderHTML
                  source={{
                    html: content,
                  }}
                  contentWidth={width}
                  tagsStyles={tagsStyles}
                  renderersProps={{
                    img: {
                      enableExperimentalPercentWidth: true,
                    },
                  }}
                  enableExperimentalMarginCollapsing={true}
                  enableExperimentalBRCollapsing={true}
                  enableExperimentalGhostLinesPrevention={true}
                  defaultTextProps={{ selectable: true }}
                  // renderers={{
                  //   img: CustomImageRenderer,
                  // }}
                />
              </View>
            </Card.Content>
          </View>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 8,
    marginBottom: 8,
    // marginTop: 8,
    // marginBottom: withReplies ? 0 : 4,
  },

  wrapper: {
    // maxHeight: 250,
    // overflow: "hidden",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  titleWrapper: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    fontWeight: "bold",
    fontSize: 21,
    lineHeight: 27,
  },

  profileName: {
    fontSize: 15,
  },

  // timeAgo: {},

  timeAgo: {
    fontSize: 11,
    color: "#c4c4c2",
    marginTop: -7,
  },

  avatarPhoto: {
    flex: 1,
    borderRadius: 100,
    width: "100%",
    // backgroundColor: "#0553",
    // height: 30,
  },

  content: {
    // overflow: "hidden",
    marginTop: -10,
    paddingBottom: 7,
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -17,
  },

  footerLeft: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  replyButton: {
    marginTop: -2,
  },

  commentsCountIconGroup: {
    display: "flex",
    flexDirection: "row",
    fontSize: 10,
    alignItems: "center",
    marginRight: 7,
  },

  footerLeftText: {
    fontSize: 10,
    color: "#c4c4c2",
    alignItems: "center",
  },

  actionsGroup: {
    display: "flex",
    // alignItems: "flex-end",
    paddingHorizontal: 10,
  },
});

const HTMLViewDefault = {
  color: "#FFF",
  overflow: "hidden",
  fontSize: 15,
  lineHeight: 22,
};

const tagsStyles = injectHTMLViewStyle(HTMLViewDefault);
