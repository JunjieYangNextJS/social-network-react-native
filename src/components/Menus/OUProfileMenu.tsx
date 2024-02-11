import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, IconButton } from "react-native-paper";
import { OtherUser, User } from "../../../types";
import BlockUserDialog from "../Dialogs/BlockUserDialog";
import ReportDialog from "../Dialogs/ReportDialog";
import useDialogStore from "../../store/useDialogStore";
import { useRemoveFriend } from "../../react-query-hooks/useUser/usePatchUser";
import GeneralModal from "../Modals/GeneralModal";
import GeneralDialog from "../Dialogs/GeneralDialog";

interface IOUProfileMenu {
  me: User;
  username: string;
  id: string;
  bio: string;
  friendList: string[];
}

const OUProfileMenu = ({
  me,
  username,
  id,
  bio,
  friendList,
}: IOUProfileMenu) => {
  const [visible, setVisible] = useState(false);
  const [blockOpened, setBlockOpened] = useState(false);
  const [reportOpened, setReportOpened] = useState(false);
  const [bioOpened, setBioOpened] = useState(false);
  const { onOpenDialog } = useDialogStore();
  const { mutate: removeFriend } = useRemoveFriend(username, id);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const MenuItems = [
    {
      label: `Report @${username}`,
      icon: "flag-outline",
      onPress: () => onReport(),
    },
    {
      label: me?.blockedUsers?.includes(id)
        ? `Unblock @${username}`
        : `Block @${username}`,
      icon: "cancel",
      onPress: () => onBlockUser(),
    },
  ];

  friendList.includes(me._id) &&
    MenuItems.push({
      label: `Unfriend @${username}`,
      icon: "hand-back-right-off-outline",
      onPress: () => onDeleteFriend(),
    });

  !!bio &&
    MenuItems.unshift({
      label: "View complete bio",
      icon: "eye-outline",
      onPress: () => onViewBio(),
    });

  const onViewBio = () => {
    closeMenu();
    setBioOpened(true);
  };
  const onCloseBio = () => {
    setBioOpened(false);
  };

  const onReport = () => {
    closeMenu();
    setReportOpened(true);
  };
  const onCancelReport = () => {
    setReportOpened(false);
  };

  const onBlockUser = () => {
    closeMenu();
    setBlockOpened(true);
  };
  const onCancelBlockUser = () => {
    setBlockOpened(false);
  };
  const onDeleteFriend = () => {
    onOpenDialog(
      `Remove @${username} from your friend list?`,
      "You can always add them back.",
      () => removeFriend()
    );

    closeMenu();
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton onPress={openMenu} icon="dots-vertical" />}
      >
        <View>
          {MenuItems.map(({ icon, label, onPress }) => (
            <Menu.Item
              leadingIcon={icon}
              key={label}
              onPress={onPress}
              dense
              title={label}
            />
          ))}
        </View>
      </Menu>
      <BlockUserDialog
        opened={blockOpened}
        onOpen={onBlockUser}
        onClose={onCancelBlockUser}
        username={username}
        id={id}
        myBlockedUsers={me.blockedUsers}
      />
      <ReportDialog
        opened={reportOpened}
        onOpen={onReport}
        onClose={onCancelReport}
        itemId={id}
        itemEndpoint="users"
      />
      {bio && (
        <GeneralDialog text={bio} opened={bioOpened} onClose={onCloseBio} />
      )}
    </View>
  );
};

export default OUProfileMenu;
