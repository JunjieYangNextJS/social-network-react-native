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
import { User } from "../../../types";
import { WebView } from "react-native-webview";
import HTMLView from "react-native-htmlview";
import calcTimeAgo from "../../utils/calcTimeAgo";
import BookmarkLikeMoreIconGroups from "../../components/IconButtonGroups/BookmarkLikeMoreIconGroups";
import useDeletePost from "../../react-query-hooks/usePosts/useDeletePost";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import injectHTMLViewStyle from "../../utils/injectHTMLViewStyles";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import PressableAvatar from "../../components/PressableAvatar";

interface IPostCard {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  lastCommentedAt: string;
  likes: string[];
  poll?: { label: string; votes: number }[];
  poster: User;
  commentCount: number;
  modFavored?: boolean;
  sticky?: boolean;
  editedAt?: string;
  userBookmarkedPosts?: string[];
  userId: string;
}

// function renderNode(
//   node: any,
//   index: any,
//   siblings: any,
//   parent: any,
//   defaultRenderer: any
// ) {
//   if (node.name == "iframe") {
//     const a = node.attribs;
//     const iframeHtml = `<iframe src="${a.src}"></iframe>`;
//     return (
//       <View
//         key={index}
//         style={{ width: Number(a.width), height: Number(a.height) }}
//       >
//         <WebView source={{ html: iframeHtml }} />
//       </View>
//     );
//   }
// }

export default function PostCard({
  id,
  title,
  content,
  createdAt,
  lastCommentedAt,
  likes,
  poll,
  poster,
  commentCount,
  modFavored,
  sticky,
  userBookmarkedPosts,
  editedAt,
  userId,
}: IPostCard) {
  //   console.log(poster);
  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "Posts",
    undefined
  >;

  const navigateToPost = () => {
    navigation.navigate("Post", {
      postId: id,
    });
  };

  const navigateToUserPage = () => {
    navigation.navigate("OtherUser", {
      username: poster.username,
      photo: poster.photo,
    });
  };

  const { mutate: handleDeletePost, status: deleteStatus } = useDeletePost();

  return (
    // <View style={styles.container}>
    //   <Image
    //     source={{ uri: poster.photo }}
    //     style={styles.avatarPhoto}
    //     // contentFit="cover"
    //     // placeholder={blurhash}
    //     // transition={1000}
    //   />
    // </View>

    <Card style={styles.card} onPress={() => navigateToPost()}>
      <View style={styles.wrapper}>
        <Card.Title
          title={title}
          titleNumberOfLines={5}
          titleStyle={styles.title}
          subtitle={
            poster.profileName +
            " - " +
            calcTimeAgo(createdAt) +
            (!!editedAt ? "  (edited)" : "")
          }
          subtitleStyle={styles.subtitle}
          left={(props) => (
            <PressableAvatar
              photo={poster.photo}
              size={45}
              navigateToUserPage={navigateToUserPage}
            />
          )}
        />

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
      <View style={styles.footer}>
        <View style={[styles.footerLeft, commentCount < 1 && { opacity: 0 }]}>
          <View style={styles.commentsCountIconGroup}>
            <Icon source="chat-processing-outline" size={14} color="#c4c4c2" />
            <Text style={{ fontSize: 12, color: "#c4c4c2" }}>
              {commentCount}
            </Text>
          </View>
          <Text style={styles.footerLeftText}>
            {"Someone commented " + calcTimeAgo(lastCommentedAt)}
          </Text>
        </View>

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
            handleDeleteItem={handleDeletePost}
            deleteStatus={deleteStatus}
            sticky={sticky}
          />
        </View>
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
    maxHeight: 250,
    overflow: "hidden",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 17,
  },

  subtitle: {
    fontSize: 10,
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
    alignItems: "flex-end",
    paddingHorizontal: 5,
  },
});

const HTMLViewDefault = {
  color: "#FFF",
  overflow: "hidden",
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
