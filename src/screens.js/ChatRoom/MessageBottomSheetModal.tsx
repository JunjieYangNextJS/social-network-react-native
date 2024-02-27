import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Platform, Keyboard } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../theme";
import { Button, IconButton } from "react-native-paper";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import useCreateMessage from "../../react-query-hooks/useChat/useCreateMessage";
import { useDidUpdate } from "../../hooks/useDidUpdate";

interface IMessageBottomSheetModal {
  chatRoomId: string;
  userId: string;
  otherUserId: string;
}

const MessageBottomSheetModal = ({
  chatRoomId,
  userId,
  otherUserId,
}: IMessageBottomSheetModal) => {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const textInputRef = useRef<any>(null);

  const bottomTabHeight = useBottomTabBarHeight();

  const [text, setText] = useState("");

  const { mutate: createMessage, isPending, isSuccess } = useCreateMessage();

  const handleSubmit = () => {
    createMessage({
      chatRoom: chatRoomId,
      sender: userId,
      receiverId: otherUserId,
      content: text,
    });
  };

  useDidUpdate(() => {
    if (isSuccess) {
      setText("");
      bottomSheetRef.current?.collapse();
      Keyboard.dismiss();
    }
  }, [isSuccess]);

  const { colors } = useAppTheme();

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  // variables
  const snapPoints = useMemo(() => [bottomTabHeight + 20], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
    // if (index === 0) {
    //   setFooterVisible(false);
    // }
  }, []);

  // renders
  return (
    <BottomSheetModal
      //   onClose={onCloseSheet}
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      onChange={handleSheetChanges}
      handleIndicatorStyle={{ display: "none" }}
      enablePanDownToClose={false}
      backgroundStyle={{
        backgroundColor: colors.background,
      }}
      style={{ zIndex: 10 }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.inputSendWrapper}>
          <BottomSheetTextInput
            style={styles.input}
            multiline={true}
            defaultValue={text}
            onChangeText={(text) => setText(text)}
            // ref={textInputRef}
            placeholder="Text Message"
            placeholderTextColor={colors.placeholder}
          />
          <View>
            <IconButton
              icon="arrow-up-circle"
              style={{ margin: 0 }}
              size={25}
              // iconColor="#DCF8C6"
              disabled={text === "" || isPending}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default MessageBottomSheetModal;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  //   backgroundColor: "grey",
  // },
  contentContainer: {
    // marginTop: -20,
  },
  inputSendWrapper: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    // marginBottom: 10,
    borderRadius: 30,
    fontSize: 16,
    lineHeight: 25,
    paddingHorizontal: 13,
    paddingVertical: 13,
    backgroundColor: "#141414",
    color: "white",
    flex: 1,
  },
});
