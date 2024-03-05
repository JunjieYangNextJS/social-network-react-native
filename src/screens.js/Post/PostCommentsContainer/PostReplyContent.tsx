import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Avatar, Divider, List, Text } from "react-native-paper";
import { PostReply } from "../../../../types";

import injectHTMLViewStyle from "../../../utils/injectHTMLViewStyles";
import { RootStackParamList } from "../../../navigators/RootStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PressableAvatar from "../../../components/PressableAvatar";
import { useRoute } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";

interface IPostReplyContent {
  reply: PostReply;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Post" | "N_Post" | "P_Post",
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
  const { width } = useWindowDimensions();

  // return (
  //   <View>
  //     <View
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         // justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <PressableAvatar
  //         photo={replier.photo}
  //         size={38}
  //         navigateToUserPage={() =>
  //           navigateToUserPage(replier.username, replier.profileImage)
  //         }
  //       />
  //       <RenderHTML
  //         source={{
  //           html: content.replace(/(\r\n|\n|\r)/gm, ""),
  //         }}
  //         contentWidth={width}
  //         tagsStyles={tagsStyles}
  //         renderersProps={{
  //           img: {
  //             enableExperimentalPercentWidth: true,
  //           },
  //         }}
  //         enableExperimentalMarginCollapsing={true}
  //         enableExperimentalBRCollapsing={true}
  //         enableExperimentalGhostLinesPrevention={true}
  //         defaultTextProps={{ selectable: true }}
  //         // renderers={{
  //         //   img: CustomImageRenderer,
  //         // }}
  //       />
  //     </View>
  //     <Divider horizontalInset={true} />
  //   </View>
  // );

  return (
    <>
      <List.Item
        style={styles.listItem}
        title={
          // <HTMLView
          //   value={content.replace(/(\r\n|\n|\r)/gm, "")}
          //   stylesheet={HTMLViewStyles}
          //   addLineBreaks={false}
          //   nodeComponentProps={{ selectable: true }}
          // />
          <RenderHTML
            source={{
              html: content.replace(/(\r\n|\n|\r)/gm, ""),
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
  margin: 0,
  padding: 0,
  marginTop: 4,

  // marginBottom: 5,
};

const tagsStyles = injectHTMLViewStyle(HTMLViewDefault);

// const HTMLViewStyles = StyleSheet.create({
//   ...HTMLStylesObj,

//   //   u: HTMLViewDefault,

//   //   i: HTMLViewDefault,

//   //   s: HTMLViewDefault,

//   img: {
//     width: 100,
//     height: 100,
//     resizeMode: "cover", // Or 'cover', 'stretch' as needed
//   },
// } as any);
