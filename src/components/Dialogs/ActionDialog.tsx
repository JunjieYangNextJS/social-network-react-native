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

const ActionDialog = () => {
  const { title, message, dialogIsOpen, onCloseDialog, action } =
    useDialogStore((state) => state);

  const onConfirmDialog = () => {
    action();
    onCloseDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={dialogIsOpen} onDismiss={onCloseDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onConfirmDialog}>Confirm</Button>
            <Button onPress={onCloseDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ActionDialog;
