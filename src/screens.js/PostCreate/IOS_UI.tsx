import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  InputAccessoryView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useRef } from "react";
import InputAccessoryIconsBar from "./InputAccessoryIconsBar";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { Badge, Icon, IconButton } from "react-native-paper";
import { About, ExposedTo, SelectArray } from "../../../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IIos_UI {
  title: string;
  content: string;
  hours: string;

  onSetHours: (hours: string) => void;
  onSetTitle: (title: string) => void;
  onSetContent: (content: string) => void;

  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isPending: boolean;
  onSetImageUri: (uri: string | null) => void;
  imageUri: string | null;
  about: About;
  onSetAbout: (about: About) => void;
  aboutArray: SelectArray;
  exposedTo: ExposedTo;
  onSetExposedTo: (exposedTo: ExposedTo) => void;
  exposedToArray: SelectArray;
  onToggleHasPoll: () => void;
}

export default function IOS_UI({
  title,
  onSetTitle,
  content,
  onSetContent,
  hours,
  onSetHours,

  onSubmit,
  isPending,
  onSetImageUri,
  imageUri,
  about,
  onSetAbout,
  aboutArray,
  exposedTo,
  onSetExposedTo,
  exposedToArray,
  onToggleHasPoll,
}: IIos_UI) {
  const inputAccessoryViewID = "uniqueID";
  const inputRef = useRef<TextInput | null>(null); // Create a ref for the TextInput

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus(); // Focus the input when screen comes into focus
        }
      }, 600);
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={{ flex: 1 }}
        >
          <View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="#b0b0b0"
                value={title}
                onChangeText={onSetTitle}
                style={styles.title}
                inputAccessoryViewID={inputAccessoryViewID}
                ref={inputRef}
              />
            </View>
            <View style={[styles.inputWrapper, {}]}>
              <TextInput
                placeholder="Content (optional)"
                placeholderTextColor="#b0b0b0"
                multiline={true}
                value={content}
                onChangeText={onSetContent}
                inputAccessoryViewID={inputAccessoryViewID}
                style={styles.content}
                scrollEnabled={false}
              />
            </View>
            {imageUri && (
              <View style={{ width: 200, height: 200, margin: 12 }}>
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 200, height: 200 }}
                >
                  <Badge
                    visible
                    style={{
                      color: "white",
                      backgroundColor: "#222",
                    }}
                    onPress={() => onSetImageUri(null)}
                  >
                    X
                  </Badge>
                </Image>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <InputAccessoryIconsBar
          onSubmit={onSubmit}
          isPending={isPending}
          title={title}
          onSetImageUri={onSetImageUri}
          about={about}
          onSetAbout={onSetAbout}
          hours={hours}
          onSetHours={onSetHours}
          aboutArray={aboutArray}
          exposedTo={exposedTo}
          onSetExposedTo={onSetExposedTo}
          exposedToArray={exposedToArray}
          onToggleHasPoll={onToggleHasPoll}
        />
      </InputAccessoryView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "500",
  },
  content: {
    color: "white",
    fontSize: 16,
  },

  inputWrapper: {
    padding: 12,
    paddingBottom: 0,
  },
});
