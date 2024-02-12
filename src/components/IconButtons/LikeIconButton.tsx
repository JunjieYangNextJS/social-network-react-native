import React, { useEffect, useState } from "react";
import { IconButton, Text, Tooltip } from "react-native-paper";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { View, StyleSheet } from "react-native";
import { getItemAsync } from "expo-secure-store";
import { useAppTheme } from "../../theme";
import { useIsFocused } from "@react-navigation/native";
import { useDidUpdate } from "../../hooks/useDidUpdate";

interface ILikeIconButton {
  userId: string;
  itemId: string;
  itemLikes: string[];
  queryName: string[];
  likedProperty: string;
}

export default function LikeIconButton({
  itemLikes,
  userId,
  queryName,
  likedProperty,
  itemId,
}: ILikeIconButton) {
  const queryClient = useQueryClient();
  const theme = useAppTheme();
  const [liked, setLiked] = useState(false);
  const [clickable, setClickable] = useState(false);
  const isFocused = useIsFocused();

  const [mutableItemLikes, setMutableItemLikes] = useState(0);

  const { mutate: patchItemLikes, status } = useMutation({
    mutationFn: async (values: {
      method: string;
      likedProperty: string;
      itemId: string;
    }) => {
      const token = await getItemAsync("token");

      return axios
        .patch(`${baseUrl}/users/patchLikedItems`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryName });
    },

    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [queryName, ["user"]] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: queryName });
    },
  });

  useEffect(() => {
    if (status !== "idle") return;

    if (itemLikes.includes(userId)) {
      setLiked(true);
      setClickable(true);
    } else {
      setLiked(false);
      setClickable(true);
    }
  }, [itemLikes, status, userId]);

  useDidUpdate(() => {
    if (isFocused) {
      setClickable(false);
      if (itemLikes.includes(userId)) {
        setLiked(true);
        setClickable(true);
      } else {
        setLiked(false);
        setClickable(true);
      }
    }
  }, [isFocused]);

  //   useDidUpdate(() => {
  //     if (status === 'error') {
  //       showError('Something went wrong, please try again later');
  //     }
  //   }, [status]);

  useEffect(() => {
    if (itemLikes) {
      setMutableItemLikes(itemLikes.length);
    }
  }, [itemLikes, setMutableItemLikes]);

  const handleLikes = async () => {
    // e.preventDefault();
    // return;

    if (!clickable) return;

    if (liked) {
      setLiked(false);
      patchItemLikes({ method: "$pull", likedProperty, itemId });

      setMutableItemLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      patchItemLikes({ method: "$addToSet", likedProperty, itemId });

      setMutableItemLikes((prev) => prev + 1);
    }
  };

  return (
    <Tooltip title="Likes" theme={{ colors: { primary: "green" } }}>
      <View style={styles.iconButtonGroup}>
        <IconButton
          icon="heart"
          size={16}
          onPress={handleLikes}
          iconColor={liked ? theme.colors.liked : theme.colors.secondary}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        />
        <Text style={styles.iconButtonText}>
          {mutableItemLikes > 0 && mutableItemLikes}
        </Text>
      </View>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  iconButtonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  iconButtonText: {
    marginRight: 20,
    marginLeft: -10,
  },
});
