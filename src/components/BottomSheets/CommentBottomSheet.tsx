import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../theme";
import { Button } from "react-native-paper";
import useReplyBottomSheetStore from "../../store/useReplyBottomSheetStore";
import HTMLView from "react-native-htmlview";
import useCreatePostReply from "../../react-query-hooks/usePostReplies/useCreatePostReply";
import useCreatePostComment from "../../react-query-hooks/usePostComments/useCreatePostComment";

interface ICommentBottomSheet {
  postId: string;
  poster: string;
}

const CommentBottomSheet = ({ postId, poster }: ICommentBottomSheet) => {
  const theme = useAppTheme();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const textInputRef = useRef<any>(null);

  const [footerVisible, setFooterVisible] = useState(false);

  const {
    mutate: createPostComment,
    isSuccess,
    isPending,
  } = useCreatePostComment(postId);

  const [text, setText] = useState("");

  // useEffect(() => {
  //   if (willReply) {
  //     setTimeout(() => {
  //       if (textInputRef.current) {
  //         textInputRef.current.focus();
  //         setFooterVisible(true);
  //       }
  //     }, 500); // Delay for visual smoothness
  //   }
  // }, [willReply]);

  useEffect(() => {
    if (isSuccess) {
      textInputRef.current.blur();
      bottomSheetRef.current?.collapse();
      setFooterVisible(false);
      setText("");
    }
  }, [isSuccess]);

  // variables
  const snapPoints = useMemo(
    () => [Platform.OS === "ios" ? "8%" : "11%", "30%"],
    []
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);

    if (index === 0) {
      setFooterVisible(false);
    }
  }, []);

  const handleSubmit = () => {
    const content = `<p>${text}</p>`;

    createPostComment({
      content,
      post: postId,
      poster,
    });
  };

  // renders
  return (
    // <View style={styles.container}>
    <BottomSheet
      //   onClose={onCloseSheet}
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      onChange={handleSheetChanges}
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{
        backgroundColor: theme.colors.elevation.level1,
      }}
    >
      <View style={styles.contentContainer}>
        <BottomSheetTextInput
          style={styles.input}
          multiline={true}
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder="Comment here..."
          placeholderTextColor={"white"}
          ref={textInputRef}
          onPressIn={() => setFooterVisible(true)}
          // onBlur={}
        />
        {footerVisible && (
          <View style={styles.footer}>
            <Button onPress={handleSubmit} disabled={!text || isPending}>
              Reply
            </Button>
          </View>
        )}
      </View>
    </BottomSheet>
    // </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  //   backgroundColor: "grey",
  // },
  contentContainer: {
    marginHorizontal: 20,
  },
  input: {
    // marginBottom: 10,
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#1C1C1E",
    color: "white",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  ReplyToContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingLeft: 12,
    alignItems: "center",
  },
});

export default CommentBottomSheet;
