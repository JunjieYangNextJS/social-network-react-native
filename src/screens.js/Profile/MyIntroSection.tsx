import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { User } from "../../../types";
import { Icon, Text } from "react-native-paper";
import { calcMonthAndYear } from "../../utils/calcTimeAgo";
import { useAppTheme } from "../../theme";
import FollowButton from "../../components/Buttons/FollowButton";
import ChatButton from "../../components/Buttons/ChatButton";
import AddFriendButton from "../../components/Buttons/AddFriendButton";

interface IMyIntroSection {
  user: User;
}

export default function MyIntroSection({ user }: IMyIntroSection) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const {
    username,
    profileName,
    photo,
    profileImage,
    createdAt,
    following,
    followers,
    gender,
    bio,
    id,
    friendList,
    sexuality,
    location,
    allowFollowing,
    allowFriending,
    whoCanMessageMe,
  } = user;

  return (
    <View style={styles.container}>
      {bio && (
        <Text
          variant="bodyMedium"
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ marginTop: 5 }}
        >
          {bio}
        </Text>
      )}
      <View style={styles.iconTextWithIconWrapper}>
        <Icon
          source={"calendar-clock-outline"}
          size={15}
          color={colors.dimmed}
        />
        <Text style={styles.iconText}>
          Joined in {calcMonthAndYear(createdAt)}
        </Text>
      </View>
      {location && (
        <View style={styles.iconTextWithIconWrapper}>
          <Icon source={"map-marker-outline"} size={15} color={colors.dimmed} />
          <Text style={styles.iconText}>{location}</Text>
        </View>
      )}
      <View style={styles.textWrapper}>
        {gender && (
          <Text style={[styles.text, !!sexuality && { marginRight: 20 }]}>
            Gender: {gender}
          </Text>
        )}
        {sexuality && <Text style={styles.text}>Sexuality: {sexuality}</Text>}
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.number}>{following.length}</Text>
          <Text style={[styles.text, { marginRight: 18 }]}>Following</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.number}>{followers.length}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
      </View>
      {/* <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          {allowFollowing && (
            <FollowButton
              myId={user._id}
              userId={id}
              userFollowers={followers}
              userUsername={username}
            />
          )}
        </View>
        <View style={styles.button}>
          {(whoCanMessageMe === "anyone" ||
            (whoCanMessageMe === "friendsOnly" &&
              friendList.includes(user._id))) && <ChatButton />}
        </View>
        <View>
          {allowFriending && (
            <AddFriendButton user={user} user={user} />
          )}
        </View>
      </View> */}
    </View>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      //   marginTop: 5,
      display: "flex",
      flexDirection: "column",
      marginHorizontal: 15,
    },
    iconTextWithIconWrapper: {
      display: "flex",
      flexDirection: "row",
      marginTop: 5,
      alignItems: "center",
    },
    iconText: {
      marginLeft: 5,
      color: colors.dimmed,
    },
    textWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      marginTop: 5,
      marginLeft: 2,
      color: colors.dimmed,
    },
    number: {
      marginTop: 5,
      marginRight: 2,
      marginLeft: 2,
      fontWeight: "500",
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "row",
      marginTop: 5,
    },
    button: {
      display: "flex",
      flexWrap: "wrap",
    },
  });
