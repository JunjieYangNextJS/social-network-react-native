import React from "react";
import { StyleSheet, View } from "react-native";
import { aboutArray } from "../PostCreate";
import SelectMenu from "../../components/Menus/SelectMenu";
import usePostsFilterStore from "../../store/usePostsFilterStore";
import { About, SortByValue } from "../../../types";

const sortArray = [
  { label: "New", value: "-lastCommentedAt" },
  { label: "Top", value: "-likesCount" },
  {
    label: "Hot",
    value: "-commentCount",
  },
];

export default function PostHeaderLeft() {
  const { onSetAbout, about, onSetSort, sort } = usePostsFilterStore();

  const onPressAboutMenuItemAction = (value: About) => {
    onSetAbout(value);
  };
  const onPressSortMenuItemAction = (value: SortByValue) => {
    onSetSort(value);
  };

  return (
    <View style={styles.wrapper}>
      <SelectMenu
        data={sortArray}
        icon="sort-variant"
        iconSize={26}
        style={styles.icon}
        selectValue={sort}
        onPressMenuItemAction={onPressSortMenuItemAction}
      />
      <SelectMenu
        data={aboutArray}
        icon="account-question-outline"
        iconSize={26}
        style={styles.icon}
        selectValue={about}
        onPressMenuItemAction={onPressAboutMenuItemAction}
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
