import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import {
  RootStackParamList,
  RootStackParamParent,
} from "../navigators/RootStackNavigator";
import { Image } from "expo-image";

interface IPressableAvatar {
  photo: string;
  size: number;
  style?: Record<string, any>;
  navigateToUserPage: () => void;
}

export default function PressableAvatar({
  photo,
  size,
  style,
  navigateToUserPage,
}: IPressableAvatar) {
  return (
    <Pressable
      onPress={navigateToUserPage}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Avatar.Image
        size={size}
        source={() => (
          <Image
            source={{
              uri: photo,
            }}
            style={[
              { flex: 1, borderRadius: 100, width: "100%" },
              !!style && style,
            ]}
          />
        )}
      />
    </Pressable>
  );
}
