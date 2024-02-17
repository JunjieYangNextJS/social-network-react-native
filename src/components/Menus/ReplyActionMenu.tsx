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
import { useAppTheme } from "../../theme";
import useDeletePostReply from "../../react-query-hooks/usePostReplies/useDeletePostReply";

interface IReplyActionMenu {
  itemId: string;
  itemCreatorId: string;
  itemEndpoint: BackendRoutes;
  userId: string;
  handleDeleteItem: (item: string) => void;
  deleteStatus: "pending" | "success" | "error" | "idle";
  willNotify?: boolean;
  openComments?: boolean;
  subscribers?: string[];
  setReadOnly?: any;
  navigateToOrigin?: any;
}

const ReplyActionMenu = ({
  itemId,
  itemCreatorId,
  itemEndpoint,
  userId,
  handleDeleteItem,
  deleteStatus,
  willNotify,
  openComments,
  subscribers,
  setReadOnly,
  navigateToOrigin,
}: IReplyActionMenu) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [reportOpen, setReportOpen] = useState(false);

  const { colors } = useAppTheme();

  const { onOpenDialog } = useDialogStore((state) => state);

  const handleReport = () => {
    closeMenu();
    setReportOpen(true);
  };

  const onCancelReport = () => {
    setReportOpen(false);
  };

  const handleDelete = () => {
    onOpenDialog(
      "Delete this comment?",
      "Note that this action is irreversible.",
      () => handleDeleteItem(itemId)
    );

    closeMenu();
  };

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
        {itemCreatorId !== userId ? (
          <Menu.Item
            onPress={handleReport}
            title="Report"
            leadingIcon="flag-outline"
          />
        ) : (
          <Menu.Item
            leadingIcon="delete-outline"
            onPress={() => handleDelete()}
            title="Delete"
            titleStyle={{ color: colors.trash }}
          />
        )}
      </Menu>
      <ReportDialog
        opened={reportOpen}
        onOpen={handleReport}
        onClose={onCancelReport}
        itemId={itemId}
        itemEndpoint={itemEndpoint}
      />
    </View>
  );
};

export default ReplyActionMenu;
