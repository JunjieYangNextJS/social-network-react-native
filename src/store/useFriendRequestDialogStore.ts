import { create } from "zustand";

interface FriendRequestDialogStore {
  friendRequestDialogIsOpen: boolean;
  message: string;
  requesterId: string;
  requesterUsername: string;
  requesterProfileName: string;
  notificationId: string

  onOpenFriendRequestDialog: (
    message: string,
    requesterId: string,
    requesterUsername: string,
    requesterProfileName: string,
    notificationId: string
  ) => void;
  onCloseFriendRequestDialog: () => void;
}

const useFriendRequestDialogStore = create<FriendRequestDialogStore>((set) => ({
  friendRequestDialogIsOpen: false,
  message: "",
  requesterId: "",
  requesterUsername: "",
  requesterProfileName: "",
  notificationId: "",

  onOpenFriendRequestDialog: (
    message,
    requesterId,
    requesterUsername,
    requesterProfileName,
    notificationId
  ) =>
    set({
      friendRequestDialogIsOpen: true,
      message,
      requesterId,
      requesterUsername,
      requesterProfileName,
      notificationId,
    }),
  onCloseFriendRequestDialog: () =>
    set({
      friendRequestDialogIsOpen: false,
      message: "",
      requesterId: "",
      requesterUsername: "",
      requesterProfileName: "",
      notificationId: ""
    }),
}));

export default useFriendRequestDialogStore;
