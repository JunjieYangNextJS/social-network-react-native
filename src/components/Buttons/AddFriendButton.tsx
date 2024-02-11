import React, { useState, useEffect, useMemo } from "react";
import { Button } from "react-native-paper";
import { usePatchOtherUserFriendRequest } from "../../react-query-hooks/useOtherUsers/usePatchOtherUser";
// import AddFriendDialog from "../Dialogs/UserRelated/AddFriendDialog";
import { OtherUser, User } from "../../../types";
import AddFriendDialog from "../Dialogs/AddFriendDialog";

interface IAddFriendButton {
  user: User;
  otherUser: OtherUser;
}

export default function AddFriendButton({ user, otherUser }: IAddFriendButton) {
  //   const [friendStatus, setFriendStatus] = useState("Pending");
  const [dialogOpened, setDialogOpened] = useState(false);

  //   useEffect(() => {

  //       if (user.friendList.find((user) => user.id === otherUser._id))
  //         // return setFriendStatus("Friended");
  //       if (
  //         otherUser?.incomingFriendRequests.some(
  //           (request) => request.userId === user?.id
  //         )
  //       )
  //     //     return setFriendStatus("Pending");
  //     //   return setFriendStatus("Add friend");

  //   }, [user, otherUser]);

  const friendStatus = useMemo(() => {
    if (
      otherUser.incomingFriendRequests.some(
        (request) => request.userId === user.id
      )
    )
      return "Pending";
    if (user.friendList.find((user) => user.id === otherUser._id))
      return "Friended";

    return "Add friend";
  }, [user, otherUser]);

  const onOpen = () => {
    setDialogOpened(true);
  };
  const onClose = () => {
    setDialogOpened(false);
  };

  return (
    <>
      <Button
        disabled={friendStatus === "Pending" || friendStatus === "Friended"}
        onPress={onOpen}
      >
        {friendStatus}
      </Button>

      <AddFriendDialog
        // username={otherUser.username}
        opened={dialogOpened}
        onOpen={onOpen}
        onClose={onClose}
        user={user}
        otherUser={otherUser}
      />
    </>
  );
}
