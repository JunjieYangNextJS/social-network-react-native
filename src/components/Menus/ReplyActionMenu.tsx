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
  const [deleteOpen, setDeleteOpen] = useState(false);

  const itemUrl = `https://www.priders.net/${itemEndpoint}/${itemId}`;

  const { copiedText, copying, copy } = useClipboard();

  const { onOpenDialog } = useDialogStore((state) => state);

  const handleReport = () => {
    setReportOpen(true);
    closeMenu();
  };

  const handleDelete = () => {
    setDeleteOpen(true);

    closeMenu();
  };

  const handleEdit = () => {
    setReadOnly(false);

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
        <Menu.Item onPress={() => handleDeleteItem(itemId)} title="Item 3" />
      </Menu>
    </View>
  );
};

export default ReplyActionMenu;
