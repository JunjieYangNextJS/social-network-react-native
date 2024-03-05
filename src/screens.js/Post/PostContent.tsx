import React from "react";
import {
  View,
  Text as NativeText,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { Card, Text } from "react-native-paper";
import { Post, User } from "../../../types";

import calcTimeAgo from "../../utils/calcTimeAgo";
import BookmarkLikeMoreIconGroups from "../../components/IconButtonGroups/BookmarkLikeMoreIconGroups";
import useDeletePost from "../../react-query-hooks/usePosts/useDeletePost";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import injectHTMLViewStyle from "../../utils/injectHTMLViewStyles";
import PressableAvatar from "../../components/PressableAvatar";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import PostPoll from "./PostPoll";
import PostStoryActionMenu from "../../components/Menus/PostStoryActionMenu";
import RenderHtml from "react-native-render-html";

interface IPostContent {
  post: Post;
  userBookmarkedPosts: string[];
  userId: string;
  userHiddenPosts: string[];
  myVotes: string[];
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Post" | "N_Post" | "P_Post",
    undefined
  >;
  navigateToUserPage: (
    username: string,
    profileImage: string | undefined
  ) => void;
}

export default function PostContent({
  post,
  userBookmarkedPosts,
  userId,
  userHiddenPosts,
  myVotes,
  navigation,
  navigateToUserPage,
}: IPostContent) {
  const {
    _id: id,
    title,
    content,
    createdAt,
    lastCommentedAt,
    likes,
    poll,
    pollEndsAt,
    poster,
    commentCount,
    modFavored,
    sticky,
    editedAt,
    subscribers,
  } = post;

  const { mutate: handleDeletePost, status: deleteStatus } = useDeletePost();
  const { width } = useWindowDimensions();

  return (
    <Card style={styles.card}>
      <View style={styles.wrapper}>
        <Card.Title
          title={poster.profileName}
          titleNumberOfLines={5}
          titleStyle={styles.profileName}
          subtitle={calcTimeAgo(createdAt) + (!!editedAt ? "  (edited)" : "")}
          subtitleStyle={styles.timeAgo}
          left={(props) => (
            <PressableAvatar
              photo={poster.photo}
              size={42}
              navigateToUserPage={() =>
                navigateToUserPage(poster.username, poster.profileImage)
              }
            />
          )}
        />

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <Card.Content>
          <View style={styles.content}>
            <RenderHtml
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
      {poll && pollEndsAt && poll.length > 0 && (
        <View>
          <PostPoll
            poll={poll}
            pollEndsAt={pollEndsAt}
            myVotes={myVotes}
            postId={id}
          />
        </View>
      )}

      <View style={styles.actionsGroup}>
        <BookmarkLikeMoreIconGroups
          userId={userId}
          itemId={id}
          queryName={["posts"]}
          itemLikes={likes}
          likedProperty="likedPosts"
          bookmarkedProperty="bookmarkedPosts"
          userBookmarkedItems={userBookmarkedPosts}
          itemCreatorId={poster._id}
          itemEndpoint="posts"
          sticky={sticky}
          subscribers={subscribers}
          actionMenu={
            <PostStoryActionMenu
              itemId={id}
              itemCreatorId={poster._id}
              itemEndpoint="posts"
              userId={userId}
              subscribers={subscribers}
              sticky={sticky}
              userHiddenPosts={userHiddenPosts}
            />
          }
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 8,
    marginVertical: 8,
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
    paddingBottom: 20,
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
    marginBottom: -10,
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  footerLeft: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
