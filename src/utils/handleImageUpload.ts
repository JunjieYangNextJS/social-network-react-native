import axios from "axios";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { getItemAsync } from "expo-secure-store";
import baseUrl from "./baseUrl";
import useToastStore from "../store/useToastStore";

const fetchImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return blob;
  };

  const handleImageUpload = async (imageUri: string, onOpenToast: (status: any, message?: string | undefined) => void) => {
    
    if (!imageUri) return;

    const result = await manipulateAsync(
      imageUri,
      [{ resize: { width: 1000 } }],
      {
        compress: 1,
        format: SaveFormat.JPEG,
      }
    );

    const file = await fetchImage(result.uri);

    const token = await getItemAsync("token");

    const s3Url = await axios
      .get(`${baseUrl}/users/expoPostStoryImageUpload`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        onOpenToast("error", "");
        return Promise.reject(err);
      })
      .then((res) => res.data.url);

    await fetch(s3Url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = s3Url.split("?")[0];

    return imageUrl;
  };

  export default handleImageUpload