import React, { useState, useEffect } from "react";

import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";

import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseUrl from "../../utils/baseUrl";
import { IconButton, Tooltip } from "react-native-paper";
import { getItemAsync } from "expo-secure-store";
import { useAppTheme } from "../../theme";
import useToastStore from "../../store/useToastStore";

interface IBookmarkIconButton {
  userBookmarkedItems?: string[];
  bookmarkedProperty: string;
  itemId: string;
}

export default function BookmarkIconButton({
  userBookmarkedItems,
  bookmarkedProperty,
  itemId,
}: IBookmarkIconButton) {
  const [bookmarked, setBookmarked] = useState(false);
  const [clickable, setClickable] = useState(false);

  const queryClient = useQueryClient();
  const theme = useAppTheme();
  const onOpenToast = useToastStore((state) => state.onOpenToast);

  const {
    mutate: patchItemBookmarks,
    status,
    data,
  } = useMutation({
    mutationFn: async (values: {
      method: "$pull" | "$addToSet";
      bookmarkedProperty: string;
      itemId: string;
    }) => {
      const token = await getItemAsync("token");

      return axios
        .patch(`${baseUrl}/users/patchBookmarkedItems`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },

    // onMutate: async (values) => {
    //   await queryClient.cancelQueries({ queryKey: ["user"] });
    // },

    onError: () => {
      onOpenToast("error", "");
      setBookmarked((prev) => !prev);
    },

    onSuccess: (_, variables) => {
      if (variables.method === "$pull") {
        onOpenToast("success", "This has been removed from your bookmarks.");
      }
      if (variables.method === "$addToSet") {
        onOpenToast("success", "This has been added to your bookmarks.");
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    retry: false,
  });

  //   useDidUpdate(() => {
  //     if (status === 'error')
  //       showError('Something went wrong, please try again later');

  //     if (data?.statement) showSuccess(data?.statement);
  //   }, [status, data]);

  useEffect(() => {
    if (status !== "idle") return;
    if (userBookmarkedItems?.includes(itemId)) {
      setBookmarked(true);
      setClickable(true);
    } else {
      setClickable(true);
    }
  }, [userBookmarkedItems, status, itemId]);

  const handleBookmarks = async () => {
    // if (!userId) return navigate("/login", { push: true });

    if (!clickable) return;

    if (bookmarked) {
      setBookmarked(false);
      patchItemBookmarks({ method: "$pull", bookmarkedProperty, itemId });
    } else {
      setBookmarked(true);
      patchItemBookmarks({ method: "$addToSet", bookmarkedProperty, itemId });
    }
  };

  return (
    <Tooltip title="Bookmark">
      <IconButton
        onPress={handleBookmarks}
        icon="bookmark"
        iconColor={
          bookmarked ? theme.colors.bookmarked : theme.colors.secondary
        }
        size={16}
        onStartShouldSetResponder={(event) => true}
        onTouchEnd={(e) => {
          e.stopPropagation();
        }}
      />
    </Tooltip>
  );
}

{
  /* <Bookmark
              size={16}
              color={bookmarked ? theme?.colors.yellow[6] : '#343a40'}
            /> */
}
