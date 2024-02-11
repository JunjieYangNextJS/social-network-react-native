import { View } from "react-native";
import React, { useState } from "react";
import useDialogStore from "../../store/useDialogStore";
import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import { OtherUser, User } from "../../../types";
import { usePatchOtherUserFriendRequest } from "../../react-query-hooks/useOtherUsers/usePatchOtherUser";

interface IAddFriendDialog {
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
  user: User;
  otherUser: OtherUser;
}

export default function AddFriendDialog({
  opened,
  onOpen,
  onClose,
  user,
  otherUser,
}: IAddFriendDialog) {
  const { mutate: patchOtherUserReceiveFriendRequest, isPending } =
    usePatchOtherUserFriendRequest(
      otherUser.username,
      `receiveFriendRequest`,
      otherUser.id,
      onClose
    );

  const [value, setValue] = useState("Are are you doing?");

  const handleSendFriendRequest = () => {
    // if (friendStatus === "Pending" || friendStatus === "Friended") return;

    patchOtherUserReceiveFriendRequest({
      userId: user.id,
      username: user.username,
      profileName: user.profileName,
      photo: user.photo,
      role: user.role,
      message: value,
    });
    // setFriendStatus("Pending");
  };

  return (
    <View>
      <Portal>
        <Dialog visible={opened} onDismiss={onClose}>
          <>
            <Dialog.Title>{`Add @${otherUser.username}`}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
                Hey!
              </Text>
              <TextInput
                defaultValue={value}
                onChangeText={(text) => setValue(text)}
                dense
                mode="outlined"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  handleSendFriendRequest();
                  //   onClose();
                }}
                disabled={isPending}
              >
                Confirm
              </Button>
              <Button onPress={onClose}>Cancel</Button>
            </Dialog.Actions>
          </>
        </Dialog>
      </Portal>
    </View>
  );
}
