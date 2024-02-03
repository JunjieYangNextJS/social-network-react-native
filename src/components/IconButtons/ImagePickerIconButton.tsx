import { View, Text } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";

interface IImagePickerIconButton {
  onSetImageUri: (uri: string) => void;
  style: Record<string, string | number>;
  size: number;
}

export default function ImagePickerIconButton({
  onSetImageUri,
  style,
  size,
}: IImagePickerIconButton) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.canceled) {
      onSetImageUri(result.assets[0].uri);
    }
  };

  return (
    <IconButton
      icon="image-outline"
      size={size}
      style={style}
      onPress={pickImage}
    />
  );
}
