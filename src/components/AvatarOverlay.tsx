import { Pressable, StyleSheet, View } from "react-native";
import ImagePickerIconButton from "./IconButtons/ImagePickerIconButton";
import { Avatar } from "react-native-paper";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import pickImage from "../utils/pickImage";

interface IAvatarOverlay {
  onSetImageUri: (uri: string) => void;
  imageUri: string;
}

const AvatarOverlay = ({ onSetImageUri, imageUri }: IAvatarOverlay) => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.button}>
        <Ionicons
          name="camera-outline"
          size={30}
          color="#fff"
          style={styles.icon}
        />
      </View>
      <Pressable onPress={() => pickImage(onSetImageUri)}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      </Pressable>
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
