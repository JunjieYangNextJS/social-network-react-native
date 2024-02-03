import { View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import { Button, IconButton } from "react-native-paper";
import ImagePickerIconButton from "../../components/IconButtons/ImagePickerIconButton";
import { About, ExposedTo, SelectArray } from "../../../types";
import SelectMenu from "../../components/Menus/SelectMenu";
import SubmitSideMenu from "./SubmitSideMenu";

interface IInputAccessoryIconsBar {
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isPending: boolean;
  onSetImageUri: (uri: string) => void;
  about: About;
  onSetAbout: (about: About) => void;
  hours: string;
  onSetHours: (hours: string) => void;
  aboutArray: SelectArray;
  exposedTo: ExposedTo;
  onSetExposedTo: (exposedTo: ExposedTo) => void;
  exposedToArray: SelectArray;
  title: string;
  onToggleHasPoll: () => void;
}

export default function InputAccessoryIconsBar({
  onSubmit,
  isPending,
  onSetImageUri,
  about,
  onSetAbout,
  aboutArray,
  exposedTo,
  onSetExposedTo,
  exposedToArray,
  title,
  hours,
  onSetHours,
  onToggleHasPoll,
}: IInputAccessoryIconsBar) {
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
          onSetSelectValue={onSetAbout}
        />
        <SelectMenu
          data={exposedToArray}
          icon="eye-outline"
          iconSize={22}
          style={styles.icon}
          selectValue={exposedTo}
          onSetSelectValue={onSetExposedTo}
        />

        <IconButton
          icon="chart-box-outline"
          size={22}
          style={styles.icon}
          onPress={onToggleHasPoll}
        />
      </View>
      <View style={styles.submitContainer}>
        <SubmitSideMenu hours={hours} onSetHours={onSetHours} />

        <Button
          style={styles.submitButton}
          disabled={isPending || !title}
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
