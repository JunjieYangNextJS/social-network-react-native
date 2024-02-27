import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface IMessageBubble {
  text: string;
  isOutgoing: boolean;
}

const MessageBubble = ({ text, isOutgoing }: IMessageBubble) => {
  const backgroundColor = !isOutgoing ? "#DCF8C6" : "#F5F5F5";
  const borderColor = !isOutgoing ? "#95EE6C" : "#D7D7D7";
  //   const padding = 10;

  return (
    <View style={[styles.messageBubble, { backgroundColor, borderColor }]}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7,
    // marginVertical: 1,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    maxWidth: 300,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    fontWeight: "400",
  },
});

export default MessageBubble;

// const MessageBubble = ({ text, isOutgoing, tailPosition }: IMessageBubble) => {
//   const backgroundColor = isOutgoing ? "#DCF8C6" : "#F5F5F5";
//   const borderColor = isOutgoing ? "#95EE6C" : "#D7D7D7";
//   const padding = isOutgoing ? 15 : 20;
//   const borderRadius = isOutgoing ? 15 : 10; // Different corner radii

//   const tailStyle = getTailStyle(tailPosition, isOutgoing, padding);

//   return (
//     <View
//       style={[
//         styles.messageBubble,
//         { backgroundColor, borderColor, padding, borderRadius },
//       ]}
//     >
//       <Text style={styles.messageText}>{text}</Text>
//       {tailStyle && <View style={tailStyle as any} />}
//     </View>
//   );
// };

// export default MessageBubble;

// const getTailStyle = (
//   tailPosition: "bottom-left" | "bottom-right",
//   isOutgoing: boolean,
//   padding: number
// ) => {
//   const baseStyle = {
//     width: 0,
//     height: 0,
//     backgroundColor: isOutgoing ? "#95EE6C" : "#D7D7D7",
//     borderTopWidth: 10,
//     borderLeftWidth: 5,
//     borderRightWidth: 5,
//     borderBottomWidth: 0,
//   };

//   switch (tailPosition) {
//     case "bottom-left":
//       if (Platform.OS === "android" || !isOutgoing) {
//         // Adjust position and rotation for non-iOS outgoing bubbles on Android
//         return {
//           ...baseStyle,
//           transform: [{ rotate: "45deg" }],
//           position: "absolute",
//           bottom: -10,
//           left: -5,
//         };
//       }
//       return {
//         ...baseStyle,
//         transform: [{ rotate: "-45deg" }],
//         position: "absolute",
//         bottom: -10,
//         left: padding / 2,
//       };
//     case "bottom-right":
//       if (Platform.OS === "android" || isOutgoing) {
//         // Adjust position and rotation for non-iOS outgoing bubbles on Android
//         return {
//           ...baseStyle,
//           transform: [{ rotate: "45deg" }],
//           position: "absolute",
//           bottom: -10,
//           right: -5,
//         };
//       }
//       return {
//         ...baseStyle,
//         transform: [{ rotate: "-45deg" }],
//         position: "absolute",
//         bottom: -10,
//         right: padding / 2,
//       };
//     default:
//       return null;
//   }
// };

// const styles = StyleSheet.create({
//   messageBubble: {
//     padding: 10,
//     marginVertical: 5,
//     marginHorizontal: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//     elevation: 2,
//   },
//   messageText: {},
// });
