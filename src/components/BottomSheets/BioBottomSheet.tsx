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

// interface ChildComponentProps {
//   bio?: string;
//   onChangeText: (field: string) => (e: string | React.ChangeEvent<any>) => void;
// }
// interface ChildComponentRef {
//   BioBottomSheetModalRef:
//     | React.RefObject<BottomSheetModalMethods>
//     | RefObject<ChildComponentRef>;
// }

interface IBioBottomSheet extends BottomSheetModalProps {
  bio: string;
  bioFromData?: string;

  //   handleBioModalPress: () => void;
}

const BioBottomSheet = React.forwardRef<BottomSheetModal, IBioBottomSheet>(
  (props, ref) => {
    const { bio, bioFromData } = props;
    const { colors } = useAppTheme();
    const { dismiss } = useBottomSheetModal();
    const { height } = useWindowDimensions();
    const { top: statusBarHeight } = useSafeAreaInsets();
    const { setFieldValue, handleChange } = useFormikContext();

    // variables
    const snapPoints = useMemo(() => [height - statusBarHeight], []);

    // callbacks

    const handleUndo = () => {
      dismiss("EditBio");
      setFieldValue("bio", bioFromData);
    };

    // renders
    return (
      <View>
        {/* <Button onPress={handleBioModalPress}>Edit</Button> */}
        <BottomSheetModal
          name="EditBio"
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
                <Text variant="titleMedium">Edit Bio</Text>
                <Button onPress={() => dismiss("EditBio")}>Save</Button>
              </View>

              <View style={styles.inputLabelWrapper}>
                {/* <Text style={styles.label}>Bio</Text> */}
                <TextInput
                  placeholder="I am a..."
                  style={styles.input}
                  defaultValue={bio}
                  onChangeText={handleChange("bio")}
                  placeholderTextColor={colors.placeholder}
                  multiline={true}
                  autoFocus={true}
                />
              </View>
            </View>
          </View>
        </BottomSheetModal>
      </View>
    );
  }
);

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

  //   body: {
  //     marginTop: 20,
  //     paddingHorizontal: 10,
  //   },

  input: {
    // marginBottom: 10,
    borderRadius: 5,
    fontSize: 17,
    lineHeight: 20,
    paddingHorizontal: 13,
    paddingVertical: 20,
    backgroundColor: "#1C1C1E",
    color: "white",
    flex: 1,
    minHeight: 150,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    width: 35,
    marginBottom: -40,
  },

  inputLabelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 12,
    // paddingHorizontal: 12,
    // marginTop: 10,
  },
});

export default BioBottomSheet;
