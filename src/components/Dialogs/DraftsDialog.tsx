import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import useDialogStore from "../../store/useDialogStore";
import useDraftsStore from "../../store/useDraftsStore";
import useDraftPosts from "../../react-query-hooks/usePosts/useDraftPosts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { useAppTheme } from "../../theme";

import useDeleteDraftPost from "../../react-query-hooks/usePosts/useDeleteDraftPost";

interface IDraftsDialog {
  navigation:
    | NativeStackNavigationProp<RootStackParamList, "PostCreate", undefined>
    | NativeStackNavigationProp<RootStackParamList, "PostDraft", undefined>;

  currentScreenPostId?: string;
}

const DraftsDialog = ({ navigation, currentScreenPostId }: IDraftsDialog) => {
  const { draftsIsOpen, onCloseDrafts, onOpenDrafts } = useDraftsStore(
    (state) => state
  );
  const { mutate: onDeleteDraftPost } = useDeleteDraftPost(
    navigation,
    onCloseDrafts
  );

  const { data } = useDraftPosts();
  const theme = useAppTheme();

  if (!data) return <ActivityIndicator />;

  const navigateToDraft = (postId: string) => {
    onCloseDrafts();
    if (currentScreenPostId === postId) return;
    navigation.replace("PostDraft", {
      postId,
    });
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={draftsIsOpen}
          onDismiss={onCloseDrafts}
          style={styles.dialog}
        >
          {/* <Dialog.Title>{title}</Dialog.Title> */}
          {data.length === 0 ? (
            <Dialog.Content>
              <Text style={{ fontSize: 16 }}>
                You currently don't have any drafts.
              </Text>
            </Dialog.Content>
          ) : (
            <Dialog.Content>
              {data.map(({ title, _id }) => (
                <View key={_id} style={styles.wrapper}>
                  <IconButton
                    icon="trash-can-outline"
                    iconColor={theme.colors.trash}
                    size={16}
                    onPress={() =>
                      onDeleteDraftPost({ postId: _id, currentScreenPostId })
                    }
                  />

                  <Text
                    onPress={() => navigateToDraft(_id)}
                    key={_id}
                    style={styles.text}
                  >
                    {title}
                  </Text>
                </View>
              ))}
            </Dialog.Content>
          )}
        </Dialog>
      </Portal>
    </View>
  );
};

export default DraftsDialog;

const styles = StyleSheet.create({
  dialog: {
    minHeight: 200,
    maxHeight: 445,
  },

  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  // IconButton: {
  //   fontSize: 16,
  //   color: "red",
  // },

  text: {
    fontSize: 16,
    flex: 1,
  },
});
