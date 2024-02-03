import React, { useState, useEffect } from "react";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseUrl from "../../utils/baseUrl";
import { getItemAsync } from "expo-secure-store";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import useToastStore from "../../store/useToastStore";
import { IconButton, Text, Tooltip } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "../../theme";

interface IReplyLikeIconButton {
  itemLikes: string[];
  itemId: string;
  userId: string;
  itemEndpoint: string;
  queryName: string[];
}

export default function ReplyLikeIconButton({
  itemLikes,
  itemId,
  userId,
  itemEndpoint,
  queryName,
}: IReplyLikeIconButton) {
  const queryClient = useQueryClient();
  const onOpenToast = useToastStore((state) => state.onOpenToast);
  const theme = useAppTheme();

  const [liked, setLiked] = useState(false);
  // const [likeIsClicked, setLikeIsClicked] = useState(false);

  const [mutableItemLikes, setMutableItemLikes] = useState(0);

  const { mutate: patchItemLikes, status } = useMutation({
    mutationFn: async (values: { method: "$pull" | "$addToSet" }) => {
      const token = await getItemAsync("token");

      return axios
        .patch(`${baseUrl}/${itemEndpoint}/updateLikes/${itemId}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },

    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: queryName });
      // setMutableItemLikes((prev) => prev + 1);
      // if (values.method === "$pull") {
      //   setMutableItemLikes(itemLikes - 1);
      // } else {
      //   setMutableItemLikes(itemLikes + 1);
      // }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryName });
    },
  });

  useEffect(() => {
    if (status !== "idle") return;
    if (itemLikes?.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [itemLikes, status, userId]);

  useDidUpdate(() => {
    if (status === "error") {
      onOpenToast("error", "");
    }
  }, [status]);

  useEffect(() => {
    if (itemLikes) {
      setMutableItemLikes(itemLikes.length);
    }
  }, [itemLikes, setMutableItemLikes]);

  const handleLikes = async () => {
    if (liked) {
      setLiked(false);
      patchItemLikes({ method: "$pull" });
      setMutableItemLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      patchItemLikes({ method: "$addToSet" });
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
