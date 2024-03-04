import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useGetChatMessages from "../../react-query-hooks/useChat/useGetChatMessages";
import { ActivityIndicator, Button } from "react-native-paper";
import { ChatMessage } from "../../../types";
import useUser from "../../react-query-hooks/useUser/useUser";
import calcTimeAgo from "../../utils/calcTimeAgo";
import MessageBubble from "./MessageBubble";
import MessageBottomSheetModal from "./MessageBottomSheetModal";
import { FlashList, MasonryFlashListRef } from "@shopify/flash-list";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import useEraseUnreadCount from "../../react-query-hooks/useChat/useEraseUnreadCount";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ChatRoom" | "P_ChatRoom" | "N_ChatRoom" | "C_ChatRoom"
>;

export default function ChatRoom({ navigation, route }: Props) {
  const { chatRoomId, username, otherUserId } = route.params;

  const { data: messages } = useGetChatMessages(chatRoomId);
  const { data: user } = useUser();
  const [visible, setVisible] = useState(false);

  // erase unread count
  const { mutate: eraseUnreadCount } = useEraseUnreadCount();
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        eraseUnreadCount({ chatRoom: chatRoomId });
      }),
    [navigation]
  );

  // scroll to last message ref
  const messagesEndRef = useRef<any>(null);
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef?.current?.scrollToEnd({
        animated: false,
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: username,
    });
  }, [route.params]);

  useDidUpdate(() => {
    const timeout = setTimeout(() => {
      messagesEndRef?.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  const renderItem = useCallback(
    (itemData: any) => {
      const { sender, _id, chatRoom, content, createdAt } =
        itemData.item as ChatMessage;

      //   const otherUser = users.find((item) => item.user._id !== user._id);

      return (
        <View
          style={[
            styles.itemContainer,
            { justifyContent: sender === user?.id ? "flex-end" : "flex-start" },
            { opacity: visible ? 1 : 0 },
          ]}
        >
          {/* <Text
            style={{
              fontSize: 20,
              marginBottom: 2,
              color: "white",
              maxWidth: 170,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {content}
          </Text> */}
          <MessageBubble text={content} isOutgoing={sender !== user?.id} />
        </View>
      );
    },
    [messages, user?._id, visible]
  );

  if (!messages || !user) return <ActivityIndicator />;

  const ITEM_HEIGHT = 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20, flex: 1, zIndex: 0 }}>
        <FlatList
          data={messages}
          keyExtractor={(item: ChatMessage) => item._id}
          renderItem={renderItem}
          ref={messagesEndRef}
          getItemLayout={(data, index) => {
            return {
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            };
          }}
          // keyboardDismissMode="interactive"
          // automaticallyAdjustContentInsets={false}
          // contentInsetAdjustmentBehavior="never"
          // maintainVisibleContentPosition={{
          //   minIndexForVisible: 0,
          //   autoscrollToTopThreshold: 100,
          // }}
          // automaticallyAdjustKeyboardInsets={true}
        />
      </View>

      <MessageBottomSheetModal
        userId={user.id}
        otherUserId={otherUserId}
        chatRoomId={chatRoomId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: "column",
  },

  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

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
});
