import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";

interface IGeneralModal {
  text: string;
  opened: boolean;

  onClose: () => void;
}

const GeneralDialog = ({ text, opened, onClose }: IGeneralModal) => {
  return (
    <View>
      <Portal>
        <Dialog visible={opened} onDismiss={onClose}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              marginHorizontal: 15,
              maxHeight: 400,
            }}
          >
            <Dialog.Title style={{ marginTop: 3 }}>Complete Bio</Dialog.Title>
            <Dialog.Content style={{ marginVertical: 10 }}>
              <Text variant="bodyLarge">{text}</Text>
            </Dialog.Content>
          </ScrollView>
        </Dialog>
      </Portal>
    </View>
  );
};

export default GeneralDialog;
