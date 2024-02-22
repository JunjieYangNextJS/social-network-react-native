import React, { RefObject, useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import BottomSheet, {
  BottomSheetModalProps,
  BottomSheetModal,
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../../theme";
import * as yup from "yup";
import { useFormikContext } from "formik";
import { User } from "../../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useChangePassword } from "../../../react-query-hooks/useAuth/usePassword";
import { useDidUpdate } from "../../../hooks/useDidUpdate";

interface IPasswordBottomSheet extends BottomSheetModalProps {
  password: string;
  passwordCurrent: string;
  passwordConfirm: string;
}

const PasswordBottomSheet = React.forwardRef<
  BottomSheetModal,
  IPasswordBottomSheet
>((props, ref) => {
  const { password, passwordCurrent, passwordConfirm } = props;
  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();
  const { setFieldValue, handleChange } = useFormikContext();
  const { mutate, isPending, isSuccess } = useChangePassword();

  //   refs
  const ref_input2 = useRef<any>();
  const ref_input3 = useRef<any>();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // callbacks

  const handleUndo = () => {
    setFieldValue("password", "");
    setFieldValue("passwordConfirm", "");
    setFieldValue("passwordCurrent", "");
    dismiss("EditPassword");
  };

  const handleSave = () => {
    mutate({ password, passwordConfirm, passwordCurrent });
  };

  useDidUpdate(() => {
    if (!isSuccess) return;
    setFieldValue("password", "");
    setFieldValue("passwordConfirm", "");
    setFieldValue("passwordCurrent", "");
    dismiss("EditPassword");
  }, [isSuccess]);

  // renders
  return (
    <View>
      {/* <Button onPress={handlePasswordModalPress}>Edit</Button> */}
      <BottomSheetModal
        name="EditPassword"
        keyboardBehavior="interactive"
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
      >
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.header}>
              <Button onPress={handleUndo} disabled={isPending}>
                Undo
              </Button>
              <Text variant="titleMedium">Edit Password</Text>
              <Button onPress={handleSave} disabled={isPending}>
                Save
              </Button>
            </View>
            {/* <View style={styles.body}>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="Pick or specify your own"
                  style={styles.input}
                  defaultValue={""}
                  onChangeText={handleChange("password")}
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View> */}
            <View style={styles.body}>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  defaultValue={passwordCurrent}
                  onChangeText={handleChange("passwordCurrent")}
                  style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_input2.current.focus()}
                />
              </View>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={password}
                  onChangeText={handleChange("password")}
                  placeholderTextColor={colors.placeholder}
                  onSubmitEditing={() => ref_input3.current.focus()}
                  ref={ref_input2}
                />
              </View>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={passwordConfirm}
                  onChangeText={handleChange("passwordConfirm")}
                  placeholderTextColor={colors.placeholder}
                  ref={ref_input3}
                />
              </View>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  body: {
    marginTop: 15,
    paddingHorizontal: 10,
  },

  input: {
    // marginBottom: 10,
    borderRadius: 5,
    fontSize: 17,
    lineHeight: 20,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#141414",
    color: "white",
    flex: 1,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    width: 105,
  },

  inputLabelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginVertical: 10,
  },
});

export default PasswordBottomSheet;
