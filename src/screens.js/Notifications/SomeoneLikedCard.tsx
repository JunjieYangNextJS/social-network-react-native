import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import calcTimeAgo from "../../utils/calcTimeAgo";

interface ISomeoneLikedCard {
  creation: string;
  content: string;
  createdAt: string;
}

export default function SomeoneLikedCard({
  creation,
  content,
  createdAt,
}: ISomeoneLikedCard) {
  return (
    <View style={styles.card}>
      <Icon source="heart" size={24} color="red" />
      <View style={styles.content}>
        <Text style={styles.text}>
          Someone liked your {creation}: "{content}"
        </Text>
        <Text style={styles.time}>{calcTimeAgo(createdAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 10,
    // justifyContent: "center",
    alignItems: "center",
  },

  content: {
    paddingLeft: 20,
  },

  text: {
    fontSize: 15,
  },

  time: {
    fontSize: 12,
    color: "#b0aeae",
    marginTop: 5,
  },
});
