import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import useDialogStore from "../../store/useDialogStore";
import useDraftsStore from "../../store/useDraftsStore";
import useDraftPosts from "../../react-query-hooks/usePosts/useDraftPosts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/RootStackNavigator";

interface IDraftsDialog {
  navigation:
    | NativeStackNavigationProp<RootStackParamList, "PostCreate", undefined>
    | NativeStackNavigationProp<RootStackParamList, "PostDraft", undefined>;
}

const DraftsDialog = ({ navigation }: IDraftsDialog) => {
  const { draftsIsOpen, onCloseDrafts, onOpenDrafts } = useDraftsStore(
    (state) => state
  );

  const { data } = useDraftPosts();

  if (!data) return <ActivityIndicator />;

  const navigateToDraft = (postId: string) => {
    onCloseDrafts();
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
                <Pressable onPress={() => navigateToDraft(_id)} key={_id}>
                  <View>
                    <Text>{title}</Text>
                  </View>
                </Pressable>
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
});
