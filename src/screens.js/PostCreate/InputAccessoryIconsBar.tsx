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
import { FormikErrors } from "formik";

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
}

export default function InputAccessoryIconsBar({
  onSubmit,

  onSetImageUri,
  about,

  aboutArray,
  exposedTo,

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
          type={"about"}
        />
        <SelectMenu
          data={exposedToArray}
          icon="eye-outline"
          iconSize={22}
          style={styles.icon}
          selectValue={exposedTo}
          type={"exposedTo"}
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
        />

        <Button
          style={styles.submitButton}
          disabled={isSubmitting || !title}
          onPress={(e: GestureResponderEvent) => onSubmit()}
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
