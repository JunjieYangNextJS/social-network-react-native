import React from "react";
import useDialogStore from "../../store/useDialogStore";
import { useRemoveFriend } from "../../react-query-hooks/useUser/usePatchUser";
import { Button } from "react-native-paper";

export default function RemoveFriendButton({
  username,
  _id,
}: {
  username: string;
  _id: string;
}) {
  const { onOpenDialog } = useDialogStore();
  const { mutate: removeFriend, isPending } = useRemoveFriend(username, _id);

  const onDeleteFriend = () => {
    onOpenDialog(
      `Remove @${username} from your friend list?`,
      "You can always add them back.",
      () => removeFriend()
    );
  };

  return (
    <Button onPress={onDeleteFriend} disabled={isPending}>
      Unfriend
    </Button>
  );
}
