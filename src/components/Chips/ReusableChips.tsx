import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

interface IReusableChips {
  chipsArray: string[];
  onPress: (chip: string) => void;
  value: string;
}

function ReusableChips({ chipsArray, onPress, value }: IReusableChips) {
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

export default ReusableChips;

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
