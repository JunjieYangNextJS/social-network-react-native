import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";

interface IAndroid_UI {
  title: string;
  content: string;
  onSetTitle: (title: string) => void;
  onSetContent: (content: string) => void;
}

export default function Android_UI({
  title,
  content,
  onSetTitle,
  onSetContent,
}: IAndroid_UI) {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inputWrapper}>
          <TextInput
            // label="Email"
            placeholder="Title"
            placeholderTextColor="#b0b0b0"
            value={title}
            onChangeText={(text) => onSetTitle(text)}
            style={styles.title}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Content (optional)"
            placeholderTextColor="#b0b0b0"
            style={styles.content}
            multiline={true}
            // label="Email"
            value={content}
            onChangeText={(text) => onSetContent(text)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
  },
  content: {
    color: "white",
    fontSize: 16,
  },

  inputWrapper: {
    padding: 10,
  },
});
