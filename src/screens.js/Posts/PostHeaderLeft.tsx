import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { aboutArray } from "../PostCreate";
import SelectMenu from "../../components/Menus/SelectMenu";

export default function PostHeaderLeft() {
  return (
    <View style={styles.wrapper}>
      <SelectMenu
        data={aboutArray}
        icon="account-question-outline"
        iconSize={26}
        style={styles.icon}
        selectValue={"General"}
        onPressMenuItemAction={() => {}}
      />
      {/* <IconButton
        icon="plus"
        size={26}
        style={styles.icon}
        onPress={() => navigateToScreen("PostCreate")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    padding: 0,
    margin: 0,
  },
});
