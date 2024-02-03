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

interface IPostStoryActionMenu {
  itemId: string;
  itemCreatorId: string;
  itemEndpoint: BackendRoutes;
  userId: string;
  handleDeleteItem: (item: string) => void;
  deleteStatus: "pending" | "success" | "error" | "idle";
  sticky: boolean | undefined;
  willNotify?: boolean;
  openComments?: boolean;
  subscribers?: string[];
  setReadOnly?: any;
  navigateToOrigin?: any;
}

const PostStoryActionMenu = ({
  itemId,
  itemCreatorId,
  itemEndpoint,
  userId,
  handleDeleteItem,
  deleteStatus,
  sticky,
  willNotify,
  openComments,
  subscribers,
  setReadOnly,
  navigateToOrigin,
}: IPostStoryActionMenu) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [reportOpen, setReportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isNotifying, setIsNotifying] = useState(true);
  const [isOpenComments, setIsOpenComments] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const itemUrl = `https://www.priders.net/${itemEndpoint}/${itemId}`;

  const { copiedText, copying, copy } = useClipboard();

  const { onOpenDialog } = useDialogStore((state) => state);

  useEffect(() => {
    setIsNotifying(!!willNotify);
    setIsOpenComments(!!openComments);
    setIsSubscribed(!!subscribers?.includes(userId));
  }, [willNotify, openComments, subscribers, userId]);

  const { mutate: patchUserPostHide } = usePatchArrayMethod(
    itemEndpoint === "stories" ? "addHiddenStory" : "addHiddenPost",
    false
  );
  const { mutate: patchCreationWillNotify } = usePatchCreation(
    itemEndpoint,
    itemId
  );
  const { mutate: patchSubscribers } = usePatchCreationSubscribers(
    itemEndpoint,
    itemId
  );
  const { mutate: patchOpenComments } = useUpdateOpenComments(itemId);

  const handleClipboard = (text: string) => {
    copy(text);
    setTimeout(() => {
      closeMenu();
    }, 500);
  };

  const handleHide = () => {
    onOpenDialog(
      "Hide this post?",
      "You can always unhide it in your homepage.",
      () => patchUserPostHide(itemId)
    );

    closeMenu();
  };

  const handleReport = () => {
    setReportOpen(true);
    closeMenu();
  };

  const handlePatchSubscribers = () => {
    patchSubscribers({ isSubscribed });
    setIsSubscribed(!isSubscribed);

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

  const handleChangeWillNotify = () => {
    patchCreationWillNotify({ willNotify: !isNotifying });
    setIsNotifying(!isNotifying);

    closeMenu();
  };
  const handlePatchOpenComments = () => {
    patchOpenComments();
    setIsOpenComments(!isOpenComments);

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
        {itemEndpoint === ("posts" || "stories") && (
          <>
            <Menu.Item
              onPress={() => handleClipboard(itemUrl)}
              title={copiedText === itemUrl ? "Copied" : "Copy link"}
              leadingIcon={
                copiedText === itemUrl
                  ? "clipboard-check-outline"
                  : "clipboard-outline"
              }
              //   disabled={copying}
            />
            <Menu.Item
              onPress={() => handleHide()}
              title="Hide"
              leadingIcon="eye-off"
            />
          </>
        )}

        {/* <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" /> */}
      </Menu>
    </View>
  );
};

export default PostStoryActionMenu;
