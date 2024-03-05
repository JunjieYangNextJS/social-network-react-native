import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../theme";
import { Button } from "react-native-paper";
import useReplyBottomSheetStore from "../../store/useReplyBottomSheetStore";

import RenderHtml from "react-native-render-html";
import useCreatePostReply from "../../react-query-hooks/usePostReplies/useCreatePostReply";

const ReplyBottomSheet = ({ postCommentId }: { postCommentId: string }) => {
  const { width } = useWindowDimensions();

  const theme = useAppTheme();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const textInputRef = useRef<any>(null);

  const [footerVisible, setFooterVisible] = useState(false);

  const { willReply, replyTo, setWillReply, setReplyTo, resetReplyTo } =
    useReplyBottomSheetStore();

  const {
    mutate: createPostReply,
    isSuccess,
    isPending,
  } = useCreatePostReply(postCommentId);

  const [text, setText] = useState("");

  useEffect(() => {
    if (willReply) {
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
          setFooterVisible(true);
        }
      }, 600); // Delay for visual smoothness
    }
  }, [willReply]);

  useEffect(() => {
    if (isSuccess) {
      textInputRef.current.blur();
      setFooterVisible(false);
      bottomSheetRef.current?.collapse();

      setText("");
    }
  }, [isSuccess]);

  // variables
  const snapPoints = useMemo(() => ["8%", "30%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
    if (index === 0) {
      setFooterVisible(false);
      setWillReply(false);
      resetReplyTo();
    }
  }, []);

  const handleSubmit = () => {
    const content = `<p>${replyTo}${text}</p>`;

    createPostReply({
      content,
      postComment: postCommentId,
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
          // onBlur={}
        />
        {footerVisible ? (
          <View style={styles.footer}>
            <View style={styles.ReplyToContainer}>
              {replyTo && <Text style={{ color: "white" }}>Replying to </Text>}

              {/* <HTMLView
                value={`<span>${replyTo}</span>`}
                stylesheet={HTMLViewStyles}

                // renderNode={renderNode}
              /> */}
              <RenderHtml
                source={{ html: `<span>${replyTo}</span>` }}
                contentWidth={width}
                tagsStyles={{
                  span: {
                    color: "#FFF",
                  },
                }}
              />
            </View>

            <Button onPress={handleSubmit} disabled={!text || isPending}>
              Reply
            </Button>
          </View>
        ) : (
          <View style={styles.footerWithoutReplyTo}>
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

export default ReplyBottomSheet;

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
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerWithoutReplyTo: {
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
