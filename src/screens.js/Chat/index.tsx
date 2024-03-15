import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Pressable,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";

import {
  ActivityIndicator,
  Avatar,
  Button,
  Icon,
  Text,
} from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import useUser from "../../react-query-hooks/useUser/useUser";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { ChatRoom } from "../../../types";
import { Image } from "expo-image";
import { useAppTheme } from "../../theme";
import calcTimeAgo from "../../utils/calcTimeAgo";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

export default function Chat({ navigation, route }: Props) {
  const { data: user } = useUser();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { colors } = useAppTheme();

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const { chatRooms } = user;
  // const isFocused = useIsFocused();

  // console.log(user.chatRooms);

  // const chatRooms = useMemo(() => {
  //   const chatRooms = withEmptyChatRooms.filter(
  //     (room) => room.lastMessage !== undefined
  //   );
  //   return chatRooms;
  // }, [withEmptyChatRooms, isFocused]);

  if (chatRooms.length < 1) {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          You haven't chatted with anyone yet.
        </Text>
      </SafeAreaView>
    );
  }

  const renderItem = useCallback(
    (itemData: any) => {
      const { users, _id, totalMessages, lastModified, lastMessage } =
        itemData.item as ChatRoom;

      const otherUser = users.find((item) => item.user._id !== user._id);
      const userChatInfo = users.find((item) => item.user._id === user._id);

      if (!otherUser || !userChatInfo) return null;

      const { totalUnread, pinned, left, muted } = userChatInfo;

      const navigateToChatRoom = () => {
        navigation.navigate("ChatRoom", {
          chatRoomId: _id,
          username: otherUser.user.username,
          otherUserId: otherUser.user._id,
        });
      };

      return (
        <Pressable onPress={navigateToChatRoom}>
          {!left && (
            <View style={styles.itemContainer}>
              <View style={styles.userInfoContainer}>
                <Avatar.Image
                  size={50}
                  source={() => (
                    <Image
                      source={{
                        uri: otherUser.user.photo,
                      }}
                      style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
                    />
                  )}
                />

                <View style={styles.descriptionContainer}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 2,
                      color: "white",
                      maxWidth: 170,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {otherUser.user.profileName}
                  </Text>
                  <Text
                    style={{ color: colors.dimmed, maxWidth: 170 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {lastMessage}
                  </Text>
                </View>
              </View>
              <View style={styles.rightTextsWrapper}>
                <Text
                  style={{
                    color: colors.dimmed,
                    fontSize: 12,
                    paddingLeft: 10,
                  }}
                >
                  {calcTimeAgo(lastModified)}
                </Text>
                <View
                  style={{
                    paddingLeft: 10,
                    paddingTop: 4,
                    display: "flex",
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  {pinned && <Icon source="pin" size={14} />}
                  {muted && <Icon source="volume-mute" size={14} />}
                  <Text
                    style={{
                      color: colors.dimmed,
                      fontSize: 12,
                      paddingLeft: 3,
                    }}
                  >
                    {totalUnread > 0 && `Unread: ${totalUnread}`}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Pressable>
      );
    },
    [user]
  );

  return (
    <SafeAreaView
      style={[{ minHeight: height - top - bottom }, styles.container]}
    >
      <FlashList
        data={chatRooms}
        keyExtractor={(item: ChatRoom) => item._id}
        renderItem={renderItem}
        estimatedItemSize={chatRooms.length}
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
  rightTextsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
