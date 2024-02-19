import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { OtherUser, User } from "../../../types";
import { Icon, Text } from "react-native-paper";
import { calcMonthAndYear } from "../../utils/calcTimeAgo";
import { useAppTheme } from "../../theme";

import FollowingAddChatButtonsGroup from "../../components/ButtonsGroup/FollowingAddChatButtonsGroup";
import FollowingBottomSheet from "../../components/BottomSheets/FollowingBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDidUpdate } from "../../hooks/useDidUpdate";

interface IOtherUserIntroSection {
  otherUser: OtherUser;
  user: User;
}

export default function OtherUserIntroSection({
  otherUser,
  user,
}: IOtherUserIntroSection) {
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
  } = otherUser;

  // refs
  const OtherUserFollowingBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleFollowingModalPress = useCallback(() => {
    OtherUserFollowingBottomSheetModalRef.current?.present();
  }, []);

  const OtherUserFollowersBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleFollowersModalPress = useCallback(() => {
    OtherUserFollowersBottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      {bio && (
        <Text
          variant="bodyMedium"
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ marginTop: 5 }}
        >
          {/* Our goal is to establish an amazing and safe community for our fellow
        priders. We would love to hear your voices! If you have any questions,
        feel free to chat me. I will get back to you as soon as I can. */}
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
        <Pressable onPress={handleFollowingModalPress}>
          <View style={styles.textWrapper}>
            <Text style={styles.number}>{following.length}</Text>
            <Text style={[styles.text, { marginRight: 18 }]}>Following</Text>
          </View>
        </Pressable>

        <Pressable onPress={handleFollowersModalPress}>
          <View style={styles.textWrapper}>
            <Text style={styles.number}>{followers.length}</Text>
            <Text style={styles.text}>Followers</Text>
          </View>
        </Pressable>
      </View>
      <FollowingAddChatButtonsGroup
        wrapperStyle={styles.buttonWrapper}
        user={user}
        otherUser={otherUser}
      />
      <FollowingBottomSheet
        enablePanDownToClose={true}
        username={username}
        title="Their Following"
        type="Following"
        // handleGenderModalPress={handleGenderModalPress}
        ref={OtherUserFollowingBottomSheetModalRef}
      >
        <></>
      </FollowingBottomSheet>
      <FollowingBottomSheet
        enablePanDownToClose={true}
        username={username}
        title="Their Followers"
        type="Followers"
        // handleGenderModalPress={handleGenderModalPress}
        ref={OtherUserFollowersBottomSheetModalRef}
      >
        <></>
      </FollowingBottomSheet>
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
