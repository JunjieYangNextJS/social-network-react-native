import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlashList } from "@shopify/flash-list";
import { useGetMyPostReplies } from "../../../react-query-hooks/useUser/useGetMyCreations";
import { Post, PostComment, PostReply } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import PostReplyContainer from "../../PostComment/PostReplyContainer";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "MyPostReplies">;

const MyPostReplies = ({}: Props) => {
  const { data: postReplies } = useGetMyPostReplies();
  const parentNavigation = useNavigation().getParent();

  if (!postReplies) {
    return <ActivityIndicator />;
  }

  const renderPostItem = (itemData: any) => {
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
  };

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
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default MyPostReplies;
