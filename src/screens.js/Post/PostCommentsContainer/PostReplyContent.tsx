import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Divider, List, Text } from "react-native-paper";
import { PostReply } from "../../../../types";
import HTMLView from "react-native-htmlview";
import { Image } from "expo-image";
import injectHTMLViewStyle from "../../../utils/injectHTMLViewStyles";
import { RootStackParamList } from "../../../navigators/RootStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PressableAvatar from "../../../components/PressableAvatar";
import { useRoute } from "@react-navigation/native";

interface IPostReplyContent {
  reply: PostReply;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Post" | "N_Post",
    undefined
  >;
  navigateToUserPage: (username: string, profileImage?: string) => void;
}

export default function PostReplyContent({
  reply,
  navigation,
  navigateToUserPage,
}: IPostReplyContent) {
  const { content, replier } = reply;

  return (
    <>
      <List.Item
        style={styles.listItem}
        title={
          <HTMLView
            value={content.replace(/(\r\n|\n|\r)/gm, "")}
            stylesheet={HTMLViewStyles}
            addLineBreaks={false}
            nodeComponentProps={{ selectable: true }}
          />
        }
        titleNumberOfLines={10}
        left={(props) => (
          <PressableAvatar
            photo={replier.photo}
            size={38}
            navigateToUserPage={() =>
              navigateToUserPage(replier.username, replier.profileImage)
            }
          />
        )}
      />
      <Divider horizontalInset={true} />
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 20,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  avatarPhoto: {
    flex: 1,
    borderRadius: 100,
    width: "100%",

    // backgroundColor: "#0553",
    // height: 30,
  },
});

const HTMLViewDefault = {
  color: "#FFF",
  overflow: "hidden",
  lineHeight: 20,
  marginTop: 6,

  // marginBottom: 5,
};

const HTMLStylesObj = injectHTMLViewStyle(HTMLViewDefault);

const HTMLViewStyles = StyleSheet.create({
  ...HTMLStylesObj,

  //   u: HTMLViewDefault,

  //   i: HTMLViewDefault,

  //   s: HTMLViewDefault,

  img: {
    width: 100,
    height: 100,
    resizeMode: "cover", // Or 'cover', 'stretch' as needed
  },
} as any);
