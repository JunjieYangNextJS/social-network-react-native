import React, { useMemo, useRef } from "react";
import { View, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import {
  BottomSheetModalProps,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../../theme";

import { useFormikContext } from "formik";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDidUpdate } from "../../../hooks/useDidUpdate";
import { useChangeEmailOrUsername } from "../../../react-query-hooks/useAuth/useChangeEmailOrUsername";

interface IUsernameBottomSheet extends BottomSheetModalProps {
  username: string;
  passwordCurrent: string;
  usernameCurrent: string;
}

const UsernameBottomSheet = React.forwardRef<
  BottomSheetModal,
  IUsernameBottomSheet
>((props, ref) => {
  const { username, passwordCurrent, usernameCurrent } = props;
  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();
  const { setFieldValue, handleChange } = useFormikContext();
  const { mutate, isPending, isSuccess } = useChangeEmailOrUsername("username");

  //   refs
  const ref_input2 = useRef<any>();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // callbacks

  const handleUndo = () => {
    setFieldValue("passwordCurrent", "");
    setFieldValue("username", usernameCurrent);
    dismiss("EditUsername");
  };

  const handleSave = () => {
    mutate({ username, passwordCurrent });
  };

  useDidUpdate(() => {
    if (!isSuccess) return;

    setFieldValue("passwordCurrent", "");
    dismiss("EditUsername");
  }, [isSuccess]);

  // renders
  return (
    <View>
      {/* <Button onPress={handleUsernameModalPress}>Edit</Button> */}
      <BottomSheetModal
        name="EditUsername"
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
              <Text variant="titleMedium">Edit Username</Text>
              <Button
                onPress={handleSave}
                disabled={
                  isPending || !passwordCurrent || usernameCurrent === username
                }
              >
                Save
              </Button>
            </View>

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
                <Text style={styles.label}>New Username</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={username}
                  onChangeText={handleChange("username")}
                  placeholderTextColor={colors.placeholder}
                  ref={ref_input2}
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

export default UsernameBottomSheet;
