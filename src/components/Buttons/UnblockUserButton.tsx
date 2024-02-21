import React, { useState } from "react";

import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { View } from "react-native";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { useQueryClient } from "@tanstack/react-query";
import { BlockedUser, User } from "../../../types";

export default function UnblockUserButton({
  username,
  _id,
}: {
  username: string;
  _id: string;
}) {
  const [opened, setOpened] = useState(false);
  const {
    mutate: removeBlockUser,
    isPending,
    isSuccess,
  } = usePatchArrayMethod("removeBlockedUser");

  const queryClient = useQueryClient();

  useDidUpdate(() => {
    if (!isSuccess) return;

    queryClient.setQueryData(["blockedUsers"], (prev: BlockedUser[]) => {
      return prev.filter((user) => user._id !== _id);
    });
    queryClient.setQueryData(["user"], (prev: User) => {
      return {
        ...prev,
        blockedUsers: prev.blockedUsers.filter((userId) => userId !== _id),
      };
    });
  }, [isSuccess]);

  const onOpen = () => {
    setOpened(true);
  };

  const onClose = () => {
    setOpened(false);
  };

  return (
    <View>
      <Button onPress={onOpen} disabled={isPending}>
        Unblock
      </Button>
      <Portal>
        <Dialog visible={opened} onDismiss={onClose}>
          <Dialog.Title>{`Unblock @${username}?`}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              @{username} will be able to view your profile page, follow you,
              start a new chat with you or send you a friend request. Their
              posts and stories will no longer be hidden away from you.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                removeBlockUser(_id);
                onClose();
              }}
              disabled={isPending}
            >
              Unblock
            </Button>
            <Button onPress={onClose}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
