import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

interface IFormChips {
  chipsArray: string[];
  onPress: (chip: string) => void;
  value: string;
}

function FormChips({ chipsArray, onPress, value }: IFormChips) {
  return (
    <View style={styles.row}>
      {chipsArray.map((chip: string) => (
        <Chip
          key={chip}
          style={styles.chip}
          selected={chip === value}
          onPress={(e: GestureResponderEvent) => onPress(chip)}

          //   mode="outlined"
        >
          {chip}
        </Chip>
      ))}
    </View>
  );
}

export default FormChips;

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    // paddingHorizontal: 12,
  },

  chip: {
    margin: 4,
  },
});
