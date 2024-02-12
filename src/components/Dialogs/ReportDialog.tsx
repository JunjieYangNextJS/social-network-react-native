import { View } from "react-native";
import React, { useState } from "react";

import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import ReusableChips from "../ReusableChips";
import usePatchReports from "../../react-query-hooks/usePatchReports";
import { BackendRoutes } from "../../../types";

interface IReportDialog {
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
  itemId: string;
  itemEndpoint: BackendRoutes;
}

const chipsArray = [
  "Hatred",
  "Spam",
  "Misinformation",
  "Harassment",
  "Violence",
  "Impersonation",
  "Doxing",
  "Plagiarism",
  "Other violations",
];

export default function ReportDialog({
  opened,
  onOpen,
  onClose,
  itemId,
  itemEndpoint,
}: IReportDialog) {
  const [value, setValue] = useState("");
  const { mutate: updateReports, isPending } = usePatchReports(
    itemId,
    itemEndpoint
  );

  const onPress = (value: string) => {
    setValue(value);
  };

  const handleSubmitReport = () => {
    updateReports({
      reportedFor: value,
    });

    onClose();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={opened} onDismiss={onClose}>
          <Dialog.Content>
            <Text variant="bodyMedium">
              We thank you for protecting yourself and our community. Please let
              us know what rules are being broken.
            </Text>
            <ReusableChips
              chipsArray={chipsArray}
              value={value}
              onPress={onPress}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => handleSubmitReport()}
              disabled={!chipsArray.includes(value) || isPending}
            >
              Confirm
            </Button>
            <Button onPress={onClose}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
