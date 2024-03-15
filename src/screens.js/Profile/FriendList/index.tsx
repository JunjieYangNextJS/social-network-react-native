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
import { Friend } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserInfoContainer from "../../../components/UserInfoContainer";
import RemoveFriendButton from "../../../components/Buttons/RemoveFriendButton";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "FriendList">;

export default function FriendList({ navigation, route }: Props) {
  const { data: user } = useUser();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const parentNavigation = useNavigation().getParent();

  if (!user) {
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

  const { friendList } = user;

  if (friendList.length < 1) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          You haven't added any friend.
        </Text>
      </SafeAreaView>
    );
  }

  const renderItem = useCallback(
    (itemData: any) => {
      const { username, profileName, _id, sexuality, gender, photo } =
        itemData.item as Friend;

      const navigateToUserPage = () => {
        // onSetPreviousScreen("Notifications");

        parentNavigation?.navigate("P_OtherUser", {
          username,
          profileImage: undefined,
        });
        // navigation.navigate("OtherUser", {
        //   username: sender.username,
        //   photo: user.photo,
        // });
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
            <RemoveFriendButton username={username} _id={_id} />
          </View>
        </View>
      );
    },
    [user]
  );

  return (
    <SafeAreaView
      style={[{ minHeight: height - top - bottom }, styles.container]}
    >
      <FlashList
        data={friendList}
        keyExtractor={(item: Friend) => item._id}
        renderItem={renderItem}
        estimatedItemSize={friendList.length}
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
