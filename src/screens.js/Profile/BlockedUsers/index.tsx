import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import useUser from "../../../react-query-hooks/useUser/useUser";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { BlockedUser, Friend } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserInfoContainer from "../../../components/UserInfoContainer";

import useGetBlockedUsers from "../../../react-query-hooks/useUser/useGetBlocked";
import UnblockUserButton from "../../../components/Buttons/UnblockUserButton";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "BlockedUsers">;

export default function BlockedUsers({ navigation, route }: Props) {
  const { data: user } = useUser();
  const { data: blockedUsers } = useGetBlockedUsers();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const parentNavigation = useNavigation().getParent();

  const renderItem = useCallback(
    (itemData: any) => {
      const { username, profileName, _id, photo } =
        itemData.item as BlockedUser;

      const navigateToUserPage = () => {
        parentNavigation?.navigate("P_OtherUser", {
          username,
          profileImage: undefined,
        });
      };

      return (
        <View style={styles.itemContainer}>
          <UserInfoContainer
            username={username}
            profileName={profileName}
            navigateToUserPage={navigateToUserPage}
            photo={photo}
          />
          <View>
            <UnblockUserButton username={username} _id={_id} />
          </View>
        </View>
      );
    },
    [user]
  );

  // if (!user || !blockedUsers) {
  //   return <ActivityIndicator />;
  // }

  // //   const { blockedUsers } = user;

  // if (blockedUsers.length < 1) {
  //   return <Text style={styles.noFriends}>You haven't blocked any user.</Text>;
  // }

  if (!blockedUsers || !user) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (blockedUsers.length < 1) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          You haven't blocked any user.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[{ minHeight: height - top - bottom }, styles.container]}
    >
      <FlashList
        data={blockedUsers}
        keyExtractor={(item: BlockedUser) => item._id}
        renderItem={renderItem}
        estimatedItemSize={blockedUsers.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    marginHorizontal: 20,
  },
  noFriends: {
    fontSize: 20,
    margin: 30,
    marginTop: 35,
    marginLeft: 35,
    lineHeight: 30,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    // justifyContent: "center",
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    marginLeft: 10,
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
  },
});
