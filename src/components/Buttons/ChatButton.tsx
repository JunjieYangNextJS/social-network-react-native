import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Button } from "react-native-paper";
import useCreateChatRoom from "../../react-query-hooks/useChat/useCreateChatRoom";
import { ChatRoom, OtherUser, WhoCanMessageMe } from "../../../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDidUpdate } from "../../hooks/useDidUpdate";

interface IChatButton {
  myId: string;
  myChatRooms: ChatRoom[];
  OUFriendList: string[];
  OUWhoCanMessageMe: WhoCanMessageMe;
  OUId: string;
  OUUsername: string;
}

export default function ChatButton({
  myId,
  myChatRooms,
  OUFriendList,
  OUWhoCanMessageMe,
  OUId,
  OUUsername,
}: IChatButton) {
  const { mutate, isSuccess, isPending } = useCreateChatRoom();
  const route = useRoute();

  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "P_OtherUser" | "OtherUser" | "N_OtherUser",
    undefined
  >;

  const handleStartChat = useCallback(() => {
    let chatRoomRoute: "P_ChatRoom" | "C_ChatRoom" | "N_ChatRoom";

    switch (route.name) {
      case "P_OtherUser":
        chatRoomRoute = "P_ChatRoom";

        break;
      case "OtherUser":
        chatRoomRoute = "C_ChatRoom";

        break;
      case "N_OtherUser":
        chatRoomRoute = "N_ChatRoom";

        break;

      default:
        chatRoomRoute = "P_ChatRoom";

        break;
    }

    const selectedChatRoom = myChatRooms.find((chatRoom) =>
      chatRoom.users.some((user) => user.user._id === OUId)
    );

    if (selectedChatRoom) {
      navigation.navigate(chatRoomRoute, {
        chatRoomId: selectedChatRoom._id,
        username: OUUsername,
        otherUserId: OUId,
      });
    } else {
      mutate({ otherUserId: OUId, userId: myId });
    }
  }, [myChatRooms, OUId, OUUsername, navigation, route.name]);

  useDidUpdate(() => {
    if (isSuccess) handleStartChat();
  }, [isSuccess]);

  return (
    <View>
      {OUWhoCanMessageMe === "none" ||
      (OUWhoCanMessageMe === "friendsOnly" && !OUFriendList.includes(myId)) ? (
        <></>
      ) : (
        <Button onPress={handleStartChat} disabled={isPending}>
          Chat
        </Button>
      )}
    </View>
  );
}
