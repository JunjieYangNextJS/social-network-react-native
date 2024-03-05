import { Pressable, StyleSheet, View } from "react-native";
import ImagePickerIconButton from "./IconButtons/ImagePickerIconButton";
import { Avatar } from "react-native-paper";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import useToastStore from "../store/useToastStore";

interface IAvatarOverlay {
  onSetImageUri: (uri: string) => void;
  imageUri: string;
}

const AvatarOverlay = ({ onSetImageUri, imageUri }: IAvatarOverlay) => {
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
    <View style={styles.avatarContainer}>
      {/* <ImagePickerIconButton
        size={50}
        style={styles.button}
        onSetImageUri={onSetImageUri}
      /> */}
      <View style={styles.button}>
        <Ionicons
          name="camera-outline"
          size={30}
          color="#fff"
          style={styles.icon}
        />
      </View>
      <Pressable onPress={pickImage}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      </Pressable>
      {/* <Avatar.Image
        size={50}
        source={() => (
          <Image
            source={{
              uri,
            }}
            style={[styles.avatar, { flex: 1, width: "100%" }]}
          />
        )}
      /> */}
    </View>
  );
};

export default AvatarOverlay;

const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
  },
  button: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Set desired opacity
    borderRadius: 100, // Optional: Add rounded corners
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // opacity: 0.7, // Adjust icon opacity as desired
  },
  avatar: {
    width: 70, // Adjust avatar size as needed
    height: 70,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ddd", // Optional: Add border
    opacity: 0.5,
  },
});
