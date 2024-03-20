import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlashList } from "@shopify/flash-list";
import { useGetMyPostReplies } from "../../../react-query-hooks/useUser/useGetMyCreations";
import { Post, PostComment, PostReply } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import PostReplyContainer from "../../PostComment/PostReplyContainer";
import { useCallback } from "react";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "MyPostReplies">;

const MyPostReplies = ({}: Props) => {
  const { data: postReplies } = useGetMyPostReplies();
  const parentNavigation = useNavigation().getParent();

  const renderPostItem = useCallback(
    (itemData: any) => {
      const item: PostReply = itemData.item;

      const navigateToPostComment = () => {
        parentNavigation?.navigate("P_PostComment", {
          postCommentId: item.postComment,
          postTitle: item.post.title,
        });
      };

      return (
        <View style={{ marginTop: 7 }}>
          <PostReplyContainer
            postReply={item}
            userUsername="Me"
            navigateToUserPage={() => {}}
            navigateToPostComment={navigateToPostComment}
          />
        </View>
      );
    },
    [postReplies]
  );

  if (!postReplies) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (postReplies.length < 1) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          You haven't left a reply yet.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={postReplies}
        keyExtractor={(item: PostReply) => item._id}
        renderItem={renderPostItem}
        // contentContainerStyle={{ paddingTop: 10 }}
        estimatedItemSize={postReplies.length}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
  },
});

export default MyPostReplies;
