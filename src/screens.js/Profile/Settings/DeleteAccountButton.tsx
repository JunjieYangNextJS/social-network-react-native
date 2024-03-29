import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useAppTheme } from "../../../theme";
import useDialogStore from "../../../store/useDialogStore";
import useDeleteAccount, {
  useDeleteGuestAccount,
} from "../../../react-query-hooks/useAuth/useDeleteAccount";
import DeleteAccountDialog from "../../../components/Dialogs/DeleteAccountDialog";

export default function DeleteAccountButton({ isGuest }: { isGuest: boolean }) {
  const { colors } = useAppTheme();

  const [opened, setOpened] = useState(false);

  const onClose = () => {
    setOpened(false);
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        labelStyle={{ color: colors.trash }}
        onPress={() => setOpened(true)}
      >
        Delete my account
      </Button>
      <DeleteAccountDialog
        isGuest={isGuest}
        onClose={onClose}
        opened={opened}
      />
    </View>
  );
}
