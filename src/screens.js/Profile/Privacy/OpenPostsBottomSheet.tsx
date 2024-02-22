import React, { useMemo, useRef, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Text, Button, HelperText, Checkbox } from "react-native-paper";
import BottomSheet, {
  BottomSheetModalProps,
  BottomSheetModal,
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExposedTo } from "../../../../types";
import { usePatchUserPrivacy } from "../../../react-query-hooks/useUser/usePatchUser";
import { useDidUpdate } from "../../../hooks/useDidUpdate";

interface IOpenPostsBottomSheet extends BottomSheetModalProps {
  postsExposedTo: ExposedTo;
}

const OpenPostsBottomSheet = React.forwardRef<
  BottomSheetModal,
  IOpenPostsBottomSheet
>((props, ref) => {
  const { postsExposedTo } = props;
  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();

  // state
  const [checkedPostsExposedTo, setCheckedPostsExposedTo] =
    useState(postsExposedTo);

  // mutation
  const { mutate, isSuccess, isPending } = usePatchUserPrivacy();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // callbacks

  const handleUndo = () => {
    setCheckedPostsExposedTo(postsExposedTo);
    dismiss("EditPostsExposedTo");
  };

  const handleSave = () => {
    mutate({ postsExposedTo: checkedPostsExposedTo });
  };

  useDidUpdate(() => {
    if (!isSuccess) return;
    dismiss("EditPostsExposedTo");
  }, [isSuccess]);

  const checkboxesArray = [
    {
      label: "Everyone",
      status:
        checkedPostsExposedTo === "public"
          ? "checked"
          : ("unchecked" as "checked" | "unchecked" | "indeterminate"),
      onPress: () => setCheckedPostsExposedTo("public"),
    },
    {
      label: "Friends Only",
      status:
        checkedPostsExposedTo === "friendsOnly"
          ? "checked"
          : ("unchecked" as "checked" | "unchecked" | "indeterminate"),
      onPress: () => setCheckedPostsExposedTo("friendsOnly"),
    },
    {
      label: "Friends and followers",
      status:
        checkedPostsExposedTo === "friendsAndFollowersOnly"
          ? "checked"
          : ("unchecked" as "checked" | "unchecked" | "indeterminate"),
      onPress: () => setCheckedPostsExposedTo("friendsAndFollowersOnly"),
    },
    {
      label: "Myself only",
      status:
        checkedPostsExposedTo === "private"
          ? "checked"
          : ("unchecked" as "checked" | "unchecked" | "indeterminate"),
      onPress: () => setCheckedPostsExposedTo("private"),
    },
  ];

  // renders
  return (
    <View>
      <BottomSheetModal
        name="EditPostsExposedTo"
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

              <Button
                onPress={handleSave}
                disabled={isPending || postsExposedTo === checkedPostsExposedTo}
              >
                Save
              </Button>
            </View>
            <View style={styles.body}>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>
                  Only your chosen group of users can see your posts listed in
                  your personal page
                </Text>
              </View>
            </View>
            <View style={styles.itemsContainer}>
              {checkboxesArray.map(({ label, status, onPress }) => (
                <View key={label} style={styles.itemWrapper}>
                  <Text style={styles.checkboxLabel}>{label}</Text>
                  <View style={styles.checkbox}>
                    <Checkbox.Android
                      status={status}
                      onPress={onPress}
                      //   focusable={true}
                    />
                  </View>
                </View>
              ))}
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

  labelWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    width: 300,
    lineHeight: 22,
  },

  itemsContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },

  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 12,
    // marginTop: 10,
  },

  checkboxLabel: {
    fontSize: 16,
  },

  checkbox: {},
});

export default OpenPostsBottomSheet;
