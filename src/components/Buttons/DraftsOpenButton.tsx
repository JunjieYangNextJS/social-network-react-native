import { View, Text, Keyboard } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import useDraftsStore from "../../store/useDraftsStore";

export default function DraftsOpenButton() {
  const { draftsIsOpen, onCloseDrafts, onOpenDrafts } = useDraftsStore();

  const openDrafts = () => {
    Keyboard.dismiss();
    onOpenDrafts();
  };

  return (
    <View>
      <Button onPress={openDrafts}>Drafts</Button>
    </View>
  );
}
