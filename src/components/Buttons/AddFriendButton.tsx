import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { usePatchOtherUserFriendRequest } from "../../react-query-hooks/useOtherUsers/usePatchOtherUser";
// import AddFriendModal from "../Modals/UserRelated/AddFriendModal";
import { OtherUser, User } from "../../../types";

interface IAddFriendButton {
  user: User;
  otherUser: OtherUser;
}

export default function AddFriendButton({ user, otherUser }: IAddFriendButton) {
  const {
    mutate: patchOtherUserReceiveFriendRequest,

    isSuccess,
  } = usePatchOtherUserFriendRequest(
    otherUser.username,
    `receiveFriendRequest`,
    otherUser.id
  );

  const [friendStatus, setFriendStatus] = useState("Pending");
  const [modalOpened, setModalOpened] = useState(false);
  const [value, setValue] = useState("Nice to meet you.");

  useEffect(() => {
    if (user && otherUser) {
      if (user.friendList.find((user) => user.id === otherUser._id))
        return setFriendStatus("Friended");
      if (
        otherUser?.incomingFriendRequests.some(
          (request) => request.userId === user?.id
        )
      )
        return setFriendStatus("Pending");
      return setFriendStatus("Add friend");
    }
  }, [user, otherUser]);

  useEffect(() => {
    if (isSuccess) {
      setModalOpened(false);
    }
  }, [isSuccess]);

  const handleSendFriendRequest = () => {
    if (friendStatus === "Pending" || friendStatus === "Friended") return;

    patchOtherUserReceiveFriendRequest({
      userId: user.id,
      username: user.username,
      profileName: user.profileName,
      photo: user.photo,
      role: user.role,
      message: value,
    });
    setFriendStatus("Pending");
  };

  return (
    <>
      <Button
        disabled={friendStatus === "Pending" || friendStatus === "Friended"}
      >
        {friendStatus}
      </Button>

      {/* <AddFriendModal
        otherUserUsername={otherUser?.username}
        opened={modalOpened}
        setOpened={setModalOpened}
        value={value}
        setValue={setValue}
        isLoading={isLoading}
        handleSendFriendRequest={handleSendFriendRequest}
      /> */}
    </>
  );
}
