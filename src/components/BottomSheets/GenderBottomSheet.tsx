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
import { useAppTheme } from "../../theme";
import * as yup from "yup";
import { useFormikContext } from "formik";
import { User } from "../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// interface ChildComponentProps {
//   gender?: string;
//   onChangeText: (field: string) => (e: string | React.ChangeEvent<any>) => void;
// }
// interface ChildComponentRef {
//   GenderBottomSheetModalRef:
//     | React.RefObject<BottomSheetModalMethods>
//     | RefObject<ChildComponentRef>;
// }

interface IGenderBottomSheet extends BottomSheetModalProps {
  gender?: string;

  //   handleGenderModalPress: () => void;
}

const GenderBottomSheet = React.forwardRef<
  BottomSheetModal,
  IGenderBottomSheet
>((props, ref) => {
  const { gender } = props;
  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();
  const { setFieldValue, handleChange } = useFormikContext();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // callbacks

  // renders
  return (
    <View>
      {/* <Button onPress={handleGenderModalPress}>Edit</Button> */}
      <BottomSheetModal
        name="EditGender"
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
              <Button onPress={() => dismiss("EditGender")}>Undo</Button>
              <Text variant="titleMedium">Edit Gender</Text>
              <Button onPress={() => dismiss("EditGender")}>Save</Button>
            </View>
            <View style={styles.body}>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Gender</Text>
                <TextInput
                  placeholder="Pick or specify your own"
                  style={styles.input}
                  defaultValue={gender}
                  onChangeText={handleChange("gender")}
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View>
            <></>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
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
    marginTop: 10,
  },

  input: {
    // marginBottom: 10,
    borderRadius: 5,
    fontSize: 17,
    lineHeight: 20,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#1C1C1E",
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
    marginTop: 10,
  },
});

export default GenderBottomSheet;
