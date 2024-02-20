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
import { useQueryClient } from "@tanstack/react-query";

interface IPostStoryActionMenu {
  itemId: string;
  itemCreatorId: string;
  itemEndpoint: BackendRoutes;
  userId: string;
  userHiddenPosts: string[];
  sticky: boolean | undefined;
  willNotify?: boolean;
  openComments?: boolean;
  subscribers: string[];
}

const PostStoryActionMenu = ({
  itemId,
  itemCreatorId,
  itemEndpoint,
  userId,
  userHiddenPosts,
  sticky,
  willNotify,
  openComments,
  subscribers,
}: IPostStoryActionMenu) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [reportOpen, setReportOpen] = useState(false);

  const [isNotifying, setIsNotifying] = useState(true);
  // const [isOpenComments, setIsOpenComments] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const itemUrl = `https://www.priders.net/${itemEndpoint}/${itemId}`;

  const { copiedText, copying, copy } = useClipboard();
  const { colors } = useAppTheme();
  const queryClient = useQueryClient();

  const { onOpenDialog } = useDialogStore((state) => state);
  const route = useRoute();

  let originRoute: "Posts" | "Notifications" | "P_Drawer";

  switch (route.name) {
    case "Post":
      originRoute = "Posts";
      break;
    case "N_Post":
      originRoute = "Notifications";
      break;

    default:
      originRoute = "P_Drawer";
      null;
      break;
  }
  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "Posts" | "Notifications" | "P_Drawer",
    undefined
  >;

  useEffect(() => {
    setIsNotifying(!!willNotify);
    // setIsOpenComments(!!openComments);
    setIsSubscribed(subscribers.includes(userId));
    setIsHidden(userHiddenPosts.includes(itemId));
  }, [willNotify, openComments, subscribers, userId]);

  const { mutate: patchUserPostHide, isSuccess: hideSuccess } =
    usePatchArrayMethod(
      itemEndpoint === "stories" ? "addHiddenStory" : "addHiddenPost",
      false
    );
  const { mutate: patchUserPostUnhide, isSuccess: unhideSuccess } =
    usePatchArrayMethod(
      itemEndpoint === "stories" ? "removeHiddenStory" : "removeHiddenPost",
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
  // const { mutate: patchOpenComments } = useUpdateOpenComments(itemId);

  const { mutate: deletePost, isSuccess: deleteIsSuccess } = useDeletePost();

  useDidUpdate(() => {
    navigation.replace(originRoute);
  }, [deleteIsSuccess]);

  useDidUpdate(() => {
    if (hideSuccess || unhideSuccess) {
      queryClient.invalidateQueries({ queryKey: ["hiddenPosts"] });
    }
  }, [hideSuccess, unhideSuccess]);

  const handleClipboard = (text: string) => {
    copy(text);
    setTimeout(() => {
      closeMenu();
    }, 500);
  };

  // for viewers
  const handleHide = () => {
    onOpenDialog(
      "Hide this post?",
      "You can always unhide it in your homepage.",
      () => {
        patchUserPostHide(itemId);
        setIsHidden(true);
      }
    );

    closeMenu();
  };
  const handleUnhide = () => {
    onOpenDialog(
      "Unhide this post?",
      "This post will become visible in your future browsing",
      () => {
        patchUserPostUnhide(itemId);
        setIsHidden(false);
      }
    );

    closeMenu();
  };

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
      "Delete this post?",
      "Note that this action is irreversible.",
      () => deletePost(itemId)
    );

    closeMenu();
  };

  // const handleEdit = () => {
  //   setReadOnly(false);

  //   closeMenu();
  // };

  const handleChangeWillNotify = () => {
    patchCreationWillNotify({ willNotify: !isNotifying });
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

            {itemCreatorId !== userId ? (
              <>
                {isHidden ? (
                  <Menu.Item
                    onPress={() => handleUnhide()}
                    title="Unhide"
                    leadingIcon="eye-off"
                  />
                ) : (
                  <Menu.Item
                    onPress={() => handleHide()}
                    title="Hide"
                    leadingIcon="eye-off"
                  />
                )}

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
                  leadingIcon={
                    isNotifying ? "bell-off-outline" : "bell-outline"
                  }
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
        )}

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

export default PostStoryActionMenu;
