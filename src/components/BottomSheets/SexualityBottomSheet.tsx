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
import ReusableChips from "../Chips/ReusableChips";

// interface ChildComponentProps {
//   sexuality?: string;
//   onChangeText: (field: string) => (e: string | React.ChangeEvent<any>) => void;
// }
// interface ChildComponentRef {
//   SexualityBottomSheetModalRef:
//     | React.RefObject<BottomSheetModalMethods>
//     | RefObject<ChildComponentRef>;
// }

interface ISexualityBottomSheet extends BottomSheetModalProps {
  sexuality: string;
  sexualityFromData?: string;

  //   handleSexualityModalPress: () => void;
}

const sexualityChips = [
  "Gay",
  "Lesbian",
  "Bisexual",
  "Bicurious",
  "Pansexual",
  "Asexual",
  "Queer",
  "Questioning",
  "AndroSexual",
  "Gynesexual",
  "Demisexual",
  "Polyamory",
  "Kink",
  "Prefer not to answer",
];

const SexualityBottomSheet = React.forwardRef<
  BottomSheetModal,
  ISexualityBottomSheet
>((props, ref) => {
  const { sexuality, sexualityFromData } = props;
  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();
  const { setFieldValue, handleChange } = useFormikContext();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // callbacks

  const handleUndo = () => {
    dismiss("EditSexuality");
    setFieldValue("sexuality", sexualityFromData);
  };

  const handleSetChipValue = (chip: string) => {
    setFieldValue("sexuality", chip);
  };

  // renders
  return (
    <View>
      {/* <Button onPress={handleSexualityModalPress}>Edit</Button> */}
      <BottomSheetModal
        name="EditSexuality"
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
              <Button onPress={handleUndo}>Undo</Button>
              <Text variant="titleMedium">Edit Sexuality</Text>
              <Button onPress={() => dismiss("EditSexuality")}>Save</Button>
            </View>
            <View style={styles.body}>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Sexuality</Text>
                <TextInput
                  placeholder="Pick or specify your own"
                  style={styles.input}
                  defaultValue={sexuality}
                  onChangeText={handleChange("sexuality")}
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View>
            <View style={styles.chipsContainer}>
              <ReusableChips
                chipsArray={sexualityChips}
                value={sexuality}
                onPress={handleSetChipValue}
              />
            </View>
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
    marginTop: 20,
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
    width: 80,
  },

  inputLabelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 10,
  },

  chipsContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default SexualityBottomSheet;
