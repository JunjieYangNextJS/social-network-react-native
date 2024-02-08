import { View } from "react-native";
import React, { useState } from "react";
import useDialogStore from "../../store/useDialogStore";
import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";

interface IBlockUserDialog {
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
  username: string;
  myBlockedUsers: string[];
  id: string;
}

export default function BlockUserDialog({
  opened,
  onOpen,
  onClose,
  username,
  myBlockedUsers,
  id,
}: IBlockUserDialog) {
  //   const { onOpenDialog } = useDialogStore((state) => state);
  const { mutate: addBlockUser, isPending: addLoading } =
    usePatchArrayMethod("addBlockedUser");
  const { mutate: removeBlockUser, isPending: removeLoading } =
    usePatchArrayMethod("removeBlockedUser");

  return (
    <View>
      <Portal>
        <Dialog visible={opened} onDismiss={onClose}>
          {myBlockedUsers.includes(id) ? (
            <>
              <Dialog.Title>{`Unblock @${username}?`}</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  @{username} will be able to view your profile page, follow
                  you, start a new chat with you or send you a friend request.
                  Their posts and stories will no longer be hidden away from
                  you.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    removeBlockUser(id);
                    onClose();
                  }}
                  disabled={removeLoading}
                >
                  Unblock
                </Button>
                <Button onPress={onClose}>Cancel</Button>
              </Dialog.Actions>
            </>
          ) : (
            <>
              <Dialog.Title>{`Block @${username}?`}</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  @{username} can no longer follow you, start a new chat with
                  you or send you a friend request. Your profile page will be
                  protected from viewing. Their posts and stories will be hidden
                  away from you.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    addBlockUser(id);
                    onClose();
                  }}
                  disabled={addLoading}
                >
                  Block
                </Button>
                <Button onPress={onClose}>Cancel</Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </Portal>
    </View>
  );
}
