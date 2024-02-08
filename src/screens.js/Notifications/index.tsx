import React, { useCallback } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, TouchableRipple } from "react-native-paper";
import useUser from "../../react-query-hooks/useUser/useUser";
import useNotifications from "../../react-query-hooks/useNotifications/useGetNotifications";
import SomeoneLikedCard from "./SomeoneLikedCard";
import { FlashList } from "@shopify/flash-list";
import {
  BackendRoutes,
  Notification,
  NotificationReceiver,
} from "../../../types";
import OtherNotificationsCard from "./OtherNotificationsCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { Pressable } from "react-native";
import useDialogStore from "../../store/useDialogStore";
import useFriendRequestDialogStore from "../../store/useFriendRequestDialogStore";
import usePatchWillNotifyNotifications from "../../react-query-hooks/useNotifications/usePatchWillNotify";
import { useQueryClient } from "@tanstack/react-query";

export default function Notifications() {
  const { data: user } = useUser();
  const { data } = useNotifications();
  const { mutate: patchReadNotifications } = usePatchWillNotifyNotifications();

  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "Notifications",
    undefined
  >;

  const { onOpenFriendRequestDialog } = useFriendRequestDialogStore();
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      if (!data) return;

      const notiCount = queryClient.getQueryData(["willNotifyNotifications"]);
      if (typeof notiCount !== "number" || notiCount === 0) return;

      const ids = data.slice(0, notiCount).map((el) => el._id);
      patchReadNotifications(ids);
    }, [data])
  );

  if (!data || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (data.length < 1) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>You don't have any notifications at the moment.</Text>
      </SafeAreaView>
    );
  }

  // console.log(user.incomingFriendRequests);

  const renderPostItem = (itemData: any) => {
    const {
      sender,
      content,
      createdAt,
      receiver,
      _id,
      route,
      postId,
      storyId,
      secretId,
      commentId,
      replyId,
      someoneLiked,
      isFollow,
      isFriendRequest,
    } = itemData.item;

    let creation;
    let navigateFunction: () => void;
    switch (route) {
      case "posts":
        creation = "post";
        navigateFunction = () =>
          navigation.navigate("N_Post", {
            postId: postId,
          });
        break;
      case "stories":
        creation = "story";
        break;
      case "secrets":
        creation = "secret";
        break;
      case "postComments":
        creation = "comment";
        navigateFunction = () =>
          navigation.navigate("N_PostComment", {
            postCommentId: commentId,
          });
        break;
      case "storyComments":
        creation = "comment";
        break;
      case "secretComments":
        creation = "comment";
        break;

      default:
        creation = "creation";
        break;
    }

    const navigateToUserPage = () => {
      // onSetPreviousScreen("Notifications");
      navigation.navigate("N_OtherUser", {
        username: sender.username,
        profileImage: user.profileImage,
      });
      // navigation.navigate("OtherUser", {
      //   username: sender.username,
      //   photo: user.photo,
      // });
    };

    const navigateToScreen = () => {
      if (isFriendRequest) {
        const requestMessage = user.incomingFriendRequests.find(
          (request) => request.userId === sender.id
        )?.message;
        const message = requestMessage ? requestMessage : "Nice to meet you.";

        return onOpenFriendRequestDialog(
          message,
          sender.id,
          sender.username,
          sender.profileName,
          _id
        );
      }

      if (isFollow) {
        return navigateToUserPage();
      }

      navigateFunction();
    };

    return (
      <View>
        <Pressable onPress={navigateToScreen}>
          {someoneLiked ? (
            <SomeoneLikedCard
              creation={creation}
              content={content}
              createdAt={createdAt}
            />
          ) : (
            <OtherNotificationsCard
              sender={sender}
              content={content}
              createdAt={createdAt}
              isFollow={isFollow}
              isFriendRequest={isFriendRequest}
              navigateToUserPage={navigateToUserPage}
            />
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data}
        keyExtractor={(item: Notification) => item._id}
        renderItem={renderPostItem}
        estimatedItemSize={data.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
