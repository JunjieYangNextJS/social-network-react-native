import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";
import useDialogStore from "../../store/useDialogStore";
import useFriendRequestDialogStore from "../../store/useFriendRequestDialogStore";
import {
  usePatchUserFriendList,
  useRemoveUserFriendRequest,
} from "../../react-query-hooks/useUser/usePatchUser";

const FriendRequestDialog = () => {
  const {
    message,
    onCloseFriendRequestDialog,
    friendRequestDialogIsOpen,
    requesterId,
    requesterUsername,
    requesterProfileName,
    notificationId,
  } = useFriendRequestDialogStore();

  const {
    mutate: patchUserRemoveFriendRequest,
    isPending: declineIsLoading,
    status,
  } = useRemoveUserFriendRequest();

  const { mutate: patchUserAcceptFriendRequest, isPending: acceptIsLoading } =
    usePatchUserFriendList();

  const onConfirmFriendRequest = () => {
    patchUserAcceptFriendRequest({
      method: `acceptFriendRequest`,
      otherUserId: requesterId,
      notificationId,
    });
    onCloseFriendRequestDialog();
  };

  const onDeclineFriendRequest = () => {
    patchUserRemoveFriendRequest({ otherUserId: requesterId, notificationId });
    onCloseFriendRequestDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={friendRequestDialogIsOpen}
          onDismiss={onCloseFriendRequestDialog}
        >
          <Dialog.Title>Friend Request</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              From{" "}
              <Text style={{ fontWeight: "bold" }}>{requesterProfileName}</Text>
              : "{message}"
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={onConfirmFriendRequest}
              disabled={acceptIsLoading || acceptIsLoading}
            >
              Accept
            </Button>
            <Button
              onPress={onDeclineFriendRequest}
              disabled={acceptIsLoading || declineIsLoading}
            >
              Decline
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FriendRequestDialog;
