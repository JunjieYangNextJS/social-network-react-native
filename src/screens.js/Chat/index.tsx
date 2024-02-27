import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";

import { ActivityIndicator, Avatar, Button, Text } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

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
    return <ActivityIndicator />;
  }

  const { chatRooms } = user;

  if (chatRooms.length < 1) {
    return (
      <Text style={styles.noFriends}>You haven't chatted with anyone yet.</Text>
    );
  }

  const renderItem = useCallback(
    (itemData: any) => {
      const { users, _id, totalMessages, lastModified, lastMessage } =
        itemData.item as ChatRoom;

      const otherUser = users.find((item) => item.user._id !== user._id);

      if (!otherUser) return null;

      const navigateToChatRoom = () => {
        navigation.navigate("ChatRoom", {
          chatRoomId: _id,
          username: otherUser.user.username,
          otherUserId: otherUser.user._id,
        });
      };

      return (
        <Pressable onPress={navigateToChatRoom}>
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
            <View>
              <Text
                style={{ color: colors.dimmed, fontSize: 12, paddingLeft: 10 }}
              >
                {calcTimeAgo(lastModified)}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [user]
  );

  return (
    <SafeAreaView
      style={[{ minHeight: height - top - bottom }, styles.container]}
    >
      <FlatList
        data={chatRooms}
        keyExtractor={(item: ChatRoom) => item._id}
        renderItem={renderItem}
        // estimatedItemSize={chatRooms.length}
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
