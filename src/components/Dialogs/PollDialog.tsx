import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput as NativeTextInput,
  Pressable,
} from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  TextInput,
  IconButton,
  TextInputProps,
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

  const leftIcon = (index: number) => {
    if (index === 1)
      return (
        <TextInput.Icon
          icon="plus"
          forceTextInputFocus={false}
          onPress={onAddOption}
        />
      );
    if (index > 1)
      return (
        <TextInput.Icon
          icon="delete"
          onPress={() => onDeleteOption(index)}
          forceTextInputFocus={false}
        />
      );
    return <TextInput.Icon icon="dots-vertical" />;
  };

  return (
    <Portal>
      <Dialog
        visible={pollVisible}
        onDismiss={onConfirmPoll}
        style={styles.dialog}
      >
        <Dialog.Title>
          Poll ends in
          <View>
            <NativeTextInput
              inputMode="numeric"
              style={styles.nativeInput}
              placeholder="bro?"
            />
          </View>
          days
        </Dialog.Title>
        <Dialog.Content>
          <ScrollView style={styles.scrollView}>
            <View style={styles.optionWrapper}>
              {options.map((option, index) => {
                return (
                  <TextInput
                    mode="outlined"
                    placeholder={`Option ${generatePlaceholder(index)}`}
                    defaultValue={option}
                    onChangeText={(text) => onSetOption(index, text)}
                    style={styles.optionInput}
                    left={leftIcon(index)}
                    dense
                    key={index}
                  />
                );
              })}
            </View>
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
  dialog: {
    height: 300,
    marginBottom: 300,
  },

  scrollView: {
    height: 200,
  },

  nativeInput: {
    borderBottomWidth: 1,
    // height: 30,
    // width: 100,
  },

  optionWrapper: {
    // display: "flex",
    // flexDirection: "row",
  },

  optionInput: {
    flex: 1,
  },
});
