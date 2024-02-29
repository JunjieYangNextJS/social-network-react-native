import { useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, IconButton } from "react-native-paper";
import { SelectArray } from "../../../types";
import { useAppTheme } from "../../theme";
import { useFormikContext } from "formik";
import useUser from "../../react-query-hooks/useUser/useUser";
import usePatchChatRoomFromMeBoolean from "../../react-query-hooks/useChat/usePatchChatRoomFromMeBoolean";
import useDialogStore from "../../store/useDialogStore";

interface IChatConfigMenu {
  chatRoomId: string;
}

const ChatConfigMenu = ({ chatRoomId }: IChatConfigMenu) => {
  const { data: user } = useUser();

  //  checks and get userChatInfo
  if (!user) return null;

  const userChatInfo = useMemo(() => {
    const selectedChatRoom = user.chatRooms.find(
      ({ _id }) => _id === chatRoomId
    );

    return selectedChatRoom?.users?.find((el) => el.user.id === user.id);
  }, [user, chatRoomId]);

  if (!userChatInfo) return null;

  //   handle open/close menu
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible((prev) => !prev);

  const closeMenu = () => setVisible(false);

  //   mutations
  const { mutate, isPending, isSuccess } = usePatchChatRoomFromMeBoolean();

  const { onOpenDialog } = useDialogStore();

  const handlePinnedChat = () => {
    if (userChatInfo.pinned) {
      onOpenDialog(
        "Unpin this chat?",
        "Pinned chats will be marked as pinned.",
        () => mutate({ chatRoomId, boolean: false, method: "pinned" })
      );
    } else {
      onOpenDialog(
        "Pin this chat?",
        "Pinned chats will be marked as pinned.",
        () => mutate({ chatRoomId, boolean: true, method: "pinned" })
      );
    }

    closeMenu();
  };
  const handleMuteChat = () => {
    if (userChatInfo.muted) {
      onOpenDialog(
        "Unmute this chat?",
        "Muted chats will no longer notify you.",
        () => mutate({ chatRoomId, boolean: false, method: "muted" })
      );
    } else {
      onOpenDialog(
        "Mute this chat?",
        "Muted chats will no longer notify you.",
        () => mutate({ chatRoomId, boolean: true, method: "muted" })
      );
    }

    closeMenu();
  };

  const handleLeaveChat = () => {
    if (userChatInfo.left) {
      onOpenDialog(
        "Return to this chat?",
        "This chat will re-appear in your chat list.",
        () => mutate({ chatRoomId, boolean: false, method: "left" })
      );
    } else {
      onOpenDialog(
        "Leave this chat?",
        "This chat will disappear from your chat list until you receive new messages.",
        () => mutate({ chatRoomId, boolean: true, method: "left" })
      );
    }

    closeMenu();
  };

  const MenuItems = [
    {
      label: userChatInfo.pinned ? "Unpin" : "Pin",
      icon: "pin-outline",
      onPress: handlePinnedChat,
    },
    {
      label: userChatInfo.muted ? "Unmute" : "Mute",
      icon: "volume-mute",
      onPress: handleMuteChat,
    },
    {
      label: userChatInfo.left ? "Return" : "Leave",
      icon: "door-closed",
      onPress: handleLeaveChat,
    },
    // {
    //   label: "Mute"
    //     ? `Unblock @${username}`
    //     : `Block @${username}`,
    //   icon: "cancel",
    //   onPress: () => onBlockUser(),
    // },
    // {
    //   label: "Leave"
    //     ? `Unblock @${username}`
    //     : `Block @${username}`,
    //   icon: "cancel",
    //   onPress: () => onBlockUser(),
    // },
  ];

  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{ margin: 0, padding: 0 }}
        anchor={
          <IconButton
            icon="cog-outline"
            size={18}
            onPress={toggleMenu}
            disabled={isPending}
            // style={[style && style]}
          />
        }
      >
        {MenuItems.map(({ icon, label, onPress }) => (
          <Menu.Item
            leadingIcon={icon}
            key={label}
            onPress={onPress}
            dense
            title={label}
          />
        ))}
        {/* {data.map(({ value, label }) => {
          return (
            <Menu.Item
              onPress={() => handlePressItem(value)}
              title={label}
              key={value}
              style={[
                { margin: 0, padding: 0 },
                {
                  backgroundColor:
                    value === selectValue
                      ? theme.colors.outlineVariant
                      : "default",
                },
              ]}
              dense
            />
          );
        })} */}
      </Menu>
    </View>
  );
};

export default ChatConfigMenu;
