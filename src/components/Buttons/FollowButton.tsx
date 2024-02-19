import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-native-paper";
import {
  useFollowOtherUser,
  useUnfollowOtherUser,
} from "../../react-query-hooks/useOtherUsers/usePatchOtherUser";
import { useQueryClient } from "@tanstack/react-query";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { useAppTheme } from "../../theme";

interface IFollowButton {
  myId: string;
  otherUserId: string;
  otherUserUsername: string;
  otherUserFollowers: string[];
  myUsername: string;
}

export default function FollowButton({
  myId,
  otherUserId,
  otherUserUsername,
  otherUserFollowers,
  myUsername,
}: IFollowButton) {
  const {
    mutate: followOtherUser,
    status: adding,
    isPending: followIsPending,
  } = useFollowOtherUser(
    otherUserId,
    otherUserUsername,
    otherUserFollowers,
    myId,
    myUsername
  );
  const {
    mutate: unfollowOtherUser,
    status: removing,
    isPending: unfollowIsPending,
  } = useUnfollowOtherUser(
    otherUserId,
    otherUserUsername,
    otherUserFollowers,
    myId,
    myUsername
  );

  const { colors } = useAppTheme();

  return (
    <>
      {otherUserFollowers.includes(myId) ? (
        <Button
          onPress={() => unfollowOtherUser()}
          disabled={unfollowIsPending}
          // mode="outlined"
          // textColor={colors.onSurface}
          // labelStyle={{ marginVertical: 6, marginHorizontal: 20 }}

          //   style={{ height: 40 }}
        >
          Following
        </Button>
      ) : (
        <Button onPress={() => followOtherUser()} disabled={followIsPending}>
          Follow
        </Button>
      )}

      {/* <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        title="Are you sure about this?"
        centered
      >
        <Button size="sm" variant="light" onClick={() => unfollowOtherUser()}>
          Unfollow
        </Button>
        <Button size="sm" variant="light" onClick={() => setOpened(false)}>
          Cancel
        </Button>
      </Modal> */}
    </>
  );
}
