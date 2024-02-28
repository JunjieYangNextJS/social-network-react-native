import {
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Button, IconButton } from "react-native-paper";
import ImagePickerIconButton from "../../components/IconButtons/ImagePickerIconButton";
import { About, ExposedTo, SelectArray } from "../../../types";
import SelectMenu from "../../components/Menus/SelectMenu";
import SubmitSideMenu from "./SubmitSideMenu";
import { FormikErrors, FormikValues, useFormikContext } from "formik";
import { usePatchDraftToPost } from "../../react-query-hooks/usePosts/usePatchPost";

interface IInputAccessoryIconsBar {
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;

  onSetImageUri: (uri: string) => void;
  about: About;

  hours: string;
  onSetHours: (hours: string) => void;

  aboutArray: SelectArray;
  exposedTo: ExposedTo;

  exposedToArray: SelectArray;
  title: string;
  onToggleHasPoll: () => void;
  isSubmitting: boolean;
  draft: boolean;
  draftPostId?: string;
}

export default function InputAccessoryIconsBar({
  onSubmit,
  draft,
  onSetImageUri,
  about,

  aboutArray,
  exposedTo,
  draftPostId,
  exposedToArray,
  title,
  hours,
  onSetHours,
  onToggleHasPoll,
  isSubmitting,
}: IInputAccessoryIconsBar) {
  const handlePollPress = () => {
    Keyboard.dismiss();
    onToggleHasPoll();
  };

  const { setFieldValue } = useFormikContext<FormikValues>();

  const handleSubmit = () => {
    if (draft) {
      setFieldValue("readyToSubmit", true);
      setFieldValue("draft", false);
      onSubmit();
    } else {
      onSubmit();
    }
  };

  const onPressAboutMenuItemAction = (value: string) => {
    setFieldValue("about", value);
  };
  const onPressExposedToMenuItemAction = (value: string) => {
    setFieldValue("exposedTo", value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <ImagePickerIconButton
          size={22}
          style={styles.icon}
          onSetImageUri={onSetImageUri}
        />

        <SelectMenu
          data={aboutArray}
          icon="account-question-outline"
          iconSize={22}
          style={styles.icon}
          selectValue={about}
          onPressMenuItemAction={onPressAboutMenuItemAction}
        />
        <SelectMenu
          data={exposedToArray}
          icon="eye-outline"
          iconSize={22}
          style={styles.icon}
          selectValue={exposedTo}
          onPressMenuItemAction={onPressExposedToMenuItemAction}
        />

        <IconButton
          icon="chart-box-outline"
          size={22}
          style={styles.icon}
          onPress={handlePollPress}
        />
      </View>
      <View style={styles.submitContainer}>
        <SubmitSideMenu
          hours={hours}
          onSetHours={onSetHours}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          title={title}
          draft={draft}
          draftPostId={draftPostId}
        />

        <Button
          style={styles.submitButton}
          disabled={isSubmitting || !title}
          onPress={(e: GestureResponderEvent) => handleSubmit()}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 0,
    marginLeft: 5,
    marginRight: 0,
  },
  submitContainer: {
    display: "flex",
    flexDirection: "row",
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    margin: 0,
    padding: 0,
  },
});
