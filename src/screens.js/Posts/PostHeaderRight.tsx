import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";

export default function PostHeaderRight({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Post", undefined>;
}) {
  const navigateToScreen = (screen: "PostCreate" | "PostsSearch") => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.wrapper}>
      <IconButton
        icon="magnify"
        size={26}
        style={styles.icon}
        onPress={() => navigateToScreen("PostsSearch")}
      />
      <IconButton
        icon="plus"
        size={26}
        style={styles.icon}
        onPress={() => navigateToScreen("PostCreate")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    padding: 0,
    margin: 0,
  },
});
