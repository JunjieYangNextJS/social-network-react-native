import { View, Text } from "react-native";
import React, { useState } from "react";
import useDialogStore from "../../store/useDialogStore";
import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";

interface IBlockUserDialog {
  opened: boolean;
  onOpen: () => void;
}

export default function BlockUserDialog({ opened, onOpen }: IBlockUserDialog) {
  const { onOpenDialog } = useDialogStore((state) => state);
  const { mutate: addBlockUser, isPending: addLoading } =
    usePatchArrayMethod("addBlockedUser");
  const { mutate: removeBlockUser, isPending: removeLoading } =
    usePatchArrayMethod("removeBlockedUser");

  return (
    <View>
      <Text>BlockUserDialog</Text>
    </View>
  );
}
