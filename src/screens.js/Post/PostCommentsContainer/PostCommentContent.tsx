import React from "react";
import { View, Text as NativeText, StyleSheet } from "react-native";
import { Image } from "expo-image";
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Text,
} from "react-native-paper";
import { PostComment, User } from "../../../../types";
import { WebView } from "react-native-webview";
import HTMLView from "react-native-htmlview";
import calcTimeAgo from "../../../utils/calcTimeAgo";
import BookmarkLikeMoreIconGroups from "../../../components/IconButtonGroups/BookmarkLikeMoreIconGroups";
import useDeletePostComment from "../../../react-query-hooks/usePostComments/useDeletePostComment";

import injectHTMLViewStyle from "../../../utils/injectHTMLViewStyles";
import PressableAvatar from "../../../components/PressableAvatar";

interface IPostCommentContent {
  postComment: PostComment;
  userBookmarkedPostComments?: string[];
  userId: string;
  withoutIconsGroup?: boolean;
  navigateToPostComment: (willReply: boolean) => void;
  navigateToUserPage: () => void;
}

export default function PostCommentContent({
  postComment,
  userBookmarkedPostComments,
  userId,
  withoutIconsGroup,
  navigateToPostComment,
  navigateToUserPage,
}: IPostCommentContent) {
  const {
    _id: id,
    post,
    content,
    createdAt,
    lastRepliedAt,
    likes,
    postReplies,
    commenter,
    subscribers,
    editedAt,
  } = postComment;

  const { mutate: handleDeletePostComment, status: deleteStatus } =
    useDeletePostComment(post._id);

  return (
    <Card style={styles.card}>
      <View style={styles.wrapper}>
        <Card.Title
          title={commenter.profileName}
          titleNumberOfLines={5}
          titleStyle={styles.profileName}
          subtitle={calcTimeAgo(createdAt) + (!!editedAt ? "  (edited)" : "")}
          subtitleStyle={styles.timeAgo}
          left={(props) => (
            <PressableAvatar
              photo={commenter.photo}
              size={42}
              navigateToUserPage={navigateToUserPage}
            />
          )}
        />

        {/* <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View> */}

        <Card.Content>
          <View style={styles.content}>
            <HTMLView
              value={content}
              stylesheet={HTMLViewStyles}
              nodeComponentProps={{ selectable: true }}
              // renderNode={renderNode}
            />
          </View>
        </Card.Content>
      </View>
      {!withoutIconsGroup && (
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <IconButton
              onPress={() => navigateToPostComment(true)}
              icon="message-reply-text-outline"
              size={16}
              // color="#c4c4c2"
            />

            {postReplies && postReplies.length > 0 && (
              <Button
                onPress={() => navigateToPostComment(false)}
                style={styles.replyButton}
              >
                {postReplies.length +
                  (postReplies.length > 1 ? " replies" : " reply")}
              </Button>
            )}
          </View>

          <View style={styles.actionsGroup}>
            <BookmarkLikeMoreIconGroups
              userId={userId}
              itemId={id}
              queryName={["post", post._id, "comments"]}
              itemLikes={likes}
              likedProperty="likedPostComments"
              bookmarkedProperty="bookmarkedPostComments"
              userBookmarkedItems={userBookmarkedPostComments}
              itemCreatorId={commenter._id}
              itemEndpoint="postComments"
              sticky={false}
              subscribers={subscribers}
            />
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 8,
    marginBottom: 10,
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
    paddingBottom: 20,
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

const HTMLStylesObj = injectHTMLViewStyle(HTMLViewDefault);

const HTMLViewStyles = StyleSheet.create({
  ...HTMLStylesObj,
  img: {
    width: 100,
    height: 100,
    resizeMode: "cover", // Or 'cover', 'stretch' as needed
  },
});
