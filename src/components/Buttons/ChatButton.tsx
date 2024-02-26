import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Button } from "react-native-paper";
import useCreateChatRoom from "../../react-query-hooks/useChat/useCreateChatRoom";
import { ChatRoom, OtherUser, WhoCanMessageMe } from "../../../types";
import { useNavigation } from "@react-navigation/native";
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

  const navigation = useNavigation() as NativeStackNavigationProp<
    RootStackParamList,
    "P_OtherUser",
    undefined
  >;

  const handleStartChat = useCallback(() => {
    const selectedChatRoom = myChatRooms.find((chatRoom) =>
      chatRoom.users.some((user) => user.user._id === OUId)
    );

    if (selectedChatRoom) {
      navigation.navigate("P_ChatRoom", {
        chatRoomId: selectedChatRoom._id,
        username: OUUsername,
      });
    } else {
      mutate({ otherUserId: OUId, userId: myId });
    }
  }, [myChatRooms, OUId, OUUsername, navigation]);

  useDidUpdate(() => {
    if (isSuccess) handleStartChat();
  }, [isSuccess]);

  return (
    <View>
      <Button onPress={handleStartChat} disabled={isPending}>
        Chat
      </Button>
    </View>
  );
}
