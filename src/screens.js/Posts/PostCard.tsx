import React, { useMemo } from "react";
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

import calcTimeAgo from "../../utils/calcTimeAgo";
import BookmarkLikeMoreIconGroups from "../../components/IconButtonGroups/BookmarkLikeMoreIconGroups";
import useDeletePost from "../../react-query-hooks/usePosts/useDeletePost";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import injectHTMLViewStyle from "../../utils/injectHTMLViewStyles";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import PressableAvatar from "../../components/PressableAvatar";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

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
  userId?: string;
  photoNotPressable?: boolean;
  subscribers: string[];
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
  photoNotPressable,
  subscribers,
}: IPostCard) {
  const route = useRoute();
  const { width } = useWindowDimensions();

  const targetRoutes = useMemo(() => {
    let postRoute: "Post" | "N_Post" | "P_Post";
    let otherUserRoute: "OtherUser" | "P_OtherUser" | "N_OtherUser";

    switch (route.name) {
      case "Posts":
        postRoute = "Post";
        otherUserRoute = "OtherUser";
      case "PostsSearch":
        postRoute = "Post";
        otherUserRoute = "OtherUser";
      case "OtherUser":
        postRoute = "Post";
        otherUserRoute = "OtherUser";
        break;
      case "N_OtherUser":
        postRoute = "N_Post";
        otherUserRoute = "N_OtherUser";
        break;
      case "Profile":
        postRoute = "P_Post";
        otherUserRoute = "P_OtherUser";
        break;
      case "MyPosts":
        postRoute = "P_Post";
        otherUserRoute = "P_OtherUser";
        break;
      case "P_OtherUser":
        postRoute = "P_Post";
        otherUserRoute = "P_OtherUser";
        break;
      default:
        postRoute = "P_Post";
        otherUserRoute = "P_OtherUser";

        break;
    }
    return { postRoute, otherUserRoute };
  }, [route]);

  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "Posts" | "Notifications" | "P_Drawer",
    undefined
  >;

  const navigateToPost = () => {
    navigation.navigate(targetRoutes.postRoute, {
      postId: id,
    });
  };

  const navigateToUserPage = () => {
    if (photoNotPressable) return;
    navigation.navigate(targetRoutes.otherUserRoute, {
      username: poster.username,
      profileImage: poster.profileImage,
    });
  };

  // const source = useMemo(() => {
  //   return {
  //     html: content,
  //   };
  // }, [content]);

  if (!content) return null;

  // const { mutate: handleDeletePost, status: deleteStatus } = useDeletePost();

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
      <View
        style={[
          styles.wrapper,
          userId ? { marginBottom: 0 } : { marginBottom: 17 },
        ]}
      >
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
            {/* <HTMLView
              value={content}
              stylesheet={HTMLViewStyles}
              nodeComponentProps={{ selectable: true }}
              // renderNode={renderNode}
            /> */}
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
              // defaultTextProps={{ selectable: true }}
            />
          </View>
        </Card.Content>
      </View>
      {userId && (
        <View style={styles.footer}>
          <View style={[styles.footerLeft, commentCount < 1 && { opacity: 0 }]}>
            <View style={styles.commentsCountIconGroup}>
              <Icon
                source="chat-processing-outline"
                size={14}
                color="#c4c4c2"
              />
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
              sticky={sticky}
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
    marginTop: -10,
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

const tagsStyles = injectHTMLViewStyle(HTMLViewDefault);
