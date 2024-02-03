import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  TextInput,
  IconButton,
} from "react-native-paper";

interface IPollDialog {
  pollVisible: boolean;
  onTogglePoll: () => void;
  onConfirmPoll: () => void;
  onCancelPoll: () => void;
  options: string[];
  onAddOption: () => void;
  onSetOption: (index: number, value: string) => void;
  onDeleteOption: (index: number) => void;
}

const PollDialog = ({
  pollVisible,
  onTogglePoll,
  onConfirmPoll,
  onCancelPoll,
  options,
  onAddOption,
  onSetOption,
  onDeleteOption,
}: IPollDialog) => {
  const generatePlaceholder = (index: number) => {
    let label = "";

    switch (index) {
      case 0:
        label = "One";
        break;
      case 1:
        label = "Two";
        break;
      case 2:
        label = "Three";
        break;
      case 3:
        label = "Four";
        break;
      case 4:
        label = "Five";
        break;
      case 5:
        label = "Six";
        break;
      case 6:
        label = "Seven";
        break;
      case 7:
        label = "Eight";
        break;
      case 8:
        label = "Nine";
        break;
      case 9:
        label = "Ten";
      default:
        label = "undefined";
        break;
    }

    return label;
  };

  return (
    <Portal>
      <Dialog visible={pollVisible} onDismiss={onConfirmPoll}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <ScrollView>
            {options.map((option, index) => {
              return (
                <View style={styles.optionWrapper}>
                  {index === 1 && <IconButton icon="plus" />}
                  {index > 1 && <IconButton icon="delete" />}
                  <TextInput
                    mode="outlined"
                    placeholder={`Option ${generatePlaceholder(index)}`}
                    key={index}
                    defaultValue={option}
                    onChangeText={(text) => onSetOption(index, text)}
                  />
                </View>
              );
            })}
            <Button onPress={onAddOption}>Add Option</Button>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onConfirmPoll}>Done</Button>
          <Button onPress={onCancelPoll}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PollDialog;

const styles = StyleSheet.create({
  optionWrapper: {
    display: "flex",
    flexDirection: "row",
  },
});
