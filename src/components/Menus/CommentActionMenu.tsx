import { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, IconButton } from "react-native-paper";
import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";
import usePatchCreation, {
  usePatchCreationSubscribers,
} from "../../react-query-hooks/usePatchCreation";
import { BackendRoutes } from "../../../types";
import { useUpdateOpenComments } from "../../react-query-hooks/useStories/usePatchStory";
import { useClipboard } from "../../hooks/useClipboard";
import useDialogStore from "../../store/useDialogStore";
import ReportDialog from "../Dialogs/ReportDialog";
import findGenre from "../../utils/findGenre";
import useDeletePost from "../../react-query-hooks/usePosts/useDeletePost";
import { useAppTheme } from "../../theme";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useDeletePostComment from "../../react-query-hooks/usePostComments/useDeletePostComment";

interface ICommentActionMenu {
  itemId: string;
  itemCreatorId: string;
  itemEndpoint: BackendRoutes;
  userId: string;
  parentId: string;
  sticky: boolean | undefined;
  willNotify?: boolean;
  openComments?: boolean;
  subscribers: string[];
}

const CommentActionMenu = ({
  itemId,
  itemCreatorId,
  itemEndpoint,
  userId,
  parentId,
  sticky,
  willNotify,

  subscribers,
}: ICommentActionMenu) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [reportOpen, setReportOpen] = useState(false);

  const [isNotifying, setIsNotifying] = useState(true);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const { colors } = useAppTheme();

  const { onOpenDialog } = useDialogStore((state) => state);

  useEffect(() => {
    setIsNotifying(!!willNotify);

    setIsSubscribed(subscribers.includes(userId));
  }, [willNotify, subscribers, userId]);

  const { mutate: patchCreationWillNotify } = usePatchCreation(
    itemEndpoint + "/patchWillNotifyCommenter",
    itemId
  );
  const { mutate: patchSubscribers } = usePatchCreationSubscribers(
    itemEndpoint,
    itemId
  );
  // const { mutate: patchOpenComments } = useUpdateOpenComments(itemId);

  const { mutate: deletePostComment } = useDeletePostComment(parentId);

  // for viewers
  //   const handleHide = () => {
  //     onOpenDialog(
  //       "Hide this post?",
  //       "You can always unhide it in your homepage.",
  //       () => patchUserPostHide(itemId)
  //     );

  //     closeMenu();
  //   };

  // const handleReport = () => {
  //   setReportOpen(true);
  //   closeMenu();
  // };

  const onReport = () => {
    closeMenu();
    setReportOpen(true);
  };
  const onCancelReport = () => {
    setReportOpen(false);
  };

  const handlePatchSubscribers = () => {
    patchSubscribers({ isSubscribed });
    closeMenu();
    setIsSubscribed((prev) => !prev);
  };

  // for creators
  const handleDelete = () => {
    onOpenDialog(
      "Delete this comment?",
      "Note that this action is irreversible.",
      () => deletePostComment(itemId)
    );

    closeMenu();
  };

  // const handleEdit = () => {
  //   setReadOnly(false);

  //   closeMenu();
  // };

  const handleChangeWillNotify = () => {
    patchCreationWillNotify({ willNotifyCommenter: !isNotifying });
    closeMenu();
    setIsNotifying((prev) => !prev);
  };

  // for stories only
  // const handlePatchOpenComments = () => {
  //   patchOpenComments();
  //   setIsOpenComments((prev) => !prev);

  //   closeMenu();
  // };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-horizontal" onPress={openMenu} />}
      >
        <>
          {itemCreatorId !== userId ? (
            <>
              <Menu.Item
                onPress={onReport}
                title="Report"
                leadingIcon="flag-outline"
              />
              <Menu.Item
                leadingIcon="bullhorn-outline"
                onPress={() => handlePatchSubscribers()}
                title={isSubscribed ? "Unsubscribe" : "Subscribe"}
              />
            </>
          ) : (
            <>
              <Menu.Item
                leadingIcon={isNotifying ? "bell-off-outline" : "bell-outline"}
                onPress={() => handleChangeWillNotify()}
                title={
                  isNotifying
                    ? "Turn off notifications"
                    : "Turn on notifications"
                }
              />
              <Menu.Item
                leadingIcon="delete-outline"
                onPress={() => handleDelete()}
                title="Delete"
                titleStyle={{ color: colors.trash }}
              />
            </>
          )}
        </>

        {/* <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" /> */}
      </Menu>
      <ReportDialog
        opened={reportOpen}
        onOpen={onReport}
        onClose={onCancelReport}
        itemId={itemId}
        itemEndpoint={itemEndpoint}
      />
    </View>
  );
};

export default CommentActionMenu;
