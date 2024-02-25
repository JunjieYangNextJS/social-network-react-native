import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useGetChatMessages from "../../react-query-hooks/useChat/useGetChatMessages";
import { ActivityIndicator } from "react-native-paper";
import { ChatMessage } from "../../../types";
import useUser from "../../react-query-hooks/useUser/useUser";
import calcTimeAgo from "../../utils/calcTimeAgo";

type Props = NativeStackScreenProps<RootStackParamList, "ChatRoom">;

export default function ChatRoom({ navigation, route }: Props) {
  const { chatRoomId, username } = route.params;

  const { data: messages } = useGetChatMessages(chatRoomId);
  const { data: user } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: username,
    });
  }, [route.params]);

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
          ]}
        >
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
            {content}
          </Text>
        </View>
      );
    },
    [messages, user?._id]
  );

  if (!messages || !user) return <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={messages}
          keyExtractor={(item: ChatMessage) => item._id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
