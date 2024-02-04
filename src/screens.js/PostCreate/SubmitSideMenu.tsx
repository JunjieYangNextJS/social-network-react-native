import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Menu,
  Divider,
  IconButton,
  Icon,
  Portal,
  Dialog,
  Text,
  TextInput,
} from "react-native-paper";
import { SelectArray } from "../../../types";
import { useAppTheme } from "../../theme";
import { FormikErrors, useFormikContext } from "formik";

interface ISubmitSideMenu {
  hours: string;
  onSetHours: (hours: string) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

const SubmitSideMenu = ({ hours, onSetHours, onSubmit }: ISubmitSideMenu) => {
  // menu
  const [visible, setVisible] = useState(false);
  const toggleMenu = () => setVisible((prev) => !prev);
  const closeMenu = () => setVisible(false);

  const { setFieldValue } = useFormikContext();

  // schedule dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => {
    setDialogVisible(true);
    closeMenu();
  };

  const onConfirmSchedule = () => {
    setDialogVisible(false);
  };
  const onCancelSchedule = () => {
    setDialogVisible(false);
    onSetHours("0");
  };

  const onSaveDraft = () => {
    // onSetDraft();
    setFieldValue("draft", true);
    onSubmit();
  };

  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={onConfirmSchedule}
        style={{ margin: 0, padding: 0 }}
        anchor={
          !visible ? (
            <IconButton
              icon="chevron-up"
              size={24}
              style={styles.chevronIcon}
              onPress={toggleMenu}
            />
          ) : (
            <IconButton
              icon="chevron-down"
              size={24}
              style={styles.chevronIcon}
              onPress={toggleMenu}
            />
          )
        }
      >
        <Menu.Item
          onPress={showDialog}
          title="Schedule"
          dense
          //   leadingIcon="calendar-clock-outline"
          leadingIcon={({ size }) => (
            <Icon size={21} source="calendar-clock-outline" />
          )}
          style={styles.item}
        />
        <Menu.Item
          onPress={() => onSaveDraft()}
          title="Save draft"
          dense
          leadingIcon={({ size }) => <Icon size={21} source="draw" />}
          style={styles.item}
        />
      </Menu>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={onConfirmSchedule}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.scheduleTitle}>
            Post in [number] hours?
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              inputMode="numeric"
              onChangeText={onSetHours}
              // placeholder={hours || "0"}
              mode="outlined"
              defaultValue={hours}
              autoFocus
              dense
              style={{ height: 40 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onConfirmSchedule}>Confirm</Button>
            <Button onPress={onCancelSchedule}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  chevronIcon: {
    margin: 0,
    padding: 0,
  },

  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },

  dialog: {
    marginBottom: 100,
  },

  scheduleTitle: {
    fontSize: 20,
  },
});

export default SubmitSideMenu;
