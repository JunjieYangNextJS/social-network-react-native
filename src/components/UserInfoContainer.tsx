import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import PressableAvatar from "./PressableAvatar";
import { useAppTheme } from "../theme";

interface IUserInfoContainer {
  photo: string;
  navigateToUserPage: () => void;
  profileName: string;
  username: string;
}

export default function UserInfoContainer({
  photo,
  navigateToUserPage,
  profileName,
  username,
}: IUserInfoContainer) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.userInfoContainer}>
      <PressableAvatar
        photo={photo}
        size={50}
        navigateToUserPage={navigateToUserPage}
      />
      <Pressable onPress={navigateToUserPage}>
        <View style={styles.descriptionContainer}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 2,
              color: "white",
              maxWidth: 150,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {profileName}
          </Text>
          <Text
            style={{ color: colors.dimmed, maxWidth: 150 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            @{username}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    marginLeft: 10,
  },
});
