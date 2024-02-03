import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon, Text } from "react-native-paper";
import calcTimeAgo from "../../utils/calcTimeAgo";
import { NotificationSender } from "../../../types";
import PressableAvatar from "../../components/PressableAvatar";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IOtherNotificationsCard {
  sender: NotificationSender;
  content: string;
  createdAt: string;
  isFollow: boolean;
  isFriendRequest: boolean;

  navigateToUserPage: () => void;
}

export default function OtherNotificationsCard({
  sender,
  content,
  createdAt,
  isFollow,
  isFriendRequest,

  navigateToUserPage,
}: IOtherNotificationsCard) {
  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "Notifications",
    undefined
  >;

  const generateText = (profileName: string) => {
    if (isFollow) return `${profileName} just followed you!`;
    if (isFriendRequest) return `${profileName} wants to add you as a friend!`;
    if (content) return `${sender.profileName}: "${content}"`;
  };

  return (
    <View style={styles.card}>
      <PressableAvatar
        size={26}
        photo={sender.photo}
        navigateToUserPage={navigateToUserPage}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{generateText(sender.profileName)}</Text>
        <Text style={styles.time}>{calcTimeAgo(createdAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 10,
    // justifyContent: "center",
    alignItems: "center",
  },

  content: {
    paddingLeft: 20,
  },

  text: {
    fontSize: 16,
  },

  time: {
    fontSize: 12,
    color: "#b0aeae",
    marginTop: 5,
  },
});
