import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput as NativeTextInput,
  Pressable,
  Keyboard,
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
import { useAppTheme } from "../../theme";

interface IPollDialog {
  pollVisible: boolean;
  onTogglePoll: () => void;
  onConfirmPoll: () => void;
  onCancelPoll: () => void;
  options: string[];
  onAddOption: () => void;
  onSetOption: (index: number, value: string) => void;
  onDeleteOption: (index: number) => void;
  pollDays: string;
  onSetPollDays: (days: string) => void;
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
  pollDays,
  onSetPollDays,
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

  const ref = React.useRef<any>({});

  return (
    <Portal>
      <Dialog
        visible={pollVisible}
        onDismiss={onConfirmPoll}
        style={styles.dialog}
      >
        <View style={styles.title}>
          <Text>Poll ends in </Text>
          <View>
            <NativeTextInput
              inputMode="numeric"
              style={styles.nativeInput}
              defaultValue={pollDays}
              onChangeText={onSetPollDays}
            />
          </View>
          <Text> days</Text>
        </View>

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
                    returnKeyType="next"
                    ref={(element: any) => {
                      if (element) {
                        ref.current[index] = element;
                      } else {
                        delete ref.current[index];
                      }
                    }}
                    onSubmitEditing={() => {
                      const nextIndex = index + 1;
                      if (nextIndex < options.length) {
                        ref.current![nextIndex].focus();
                      } else {
                        Keyboard.dismiss();
                      }
                    }}
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
    maxHeight: 300,
    marginBottom: 200,
  },

  scrollView: {
    maxHeight: 170,
  },

  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  nativeInput: {
    borderBottomWidth: 1,
    borderColor: "rgb(231, 225, 229)",
    color: "rgb(231, 225, 229)",

    // height: 30,
    // width: 100,
  },

  optionWrapper: {
    // display: "flex",
    // flexDirection: "row",
  },

  optionInput: {
    flex: 1,
    height: 38,
    margin: 5,
  },
});
