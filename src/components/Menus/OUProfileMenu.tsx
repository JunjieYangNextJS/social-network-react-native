import { useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, IconButton } from "react-native-paper";
import { OtherUser, User } from "../../../types";
import BlockUserDialog from "../Dialogs/BlockUserDialog";
import ReportDialog from "../Dialogs/ReportDialog";

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

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const MenuItems = [
    {
      label: "View complete bio",
      icon: "eye-outline",
      onPress: () => onViewBio(),
    },
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

  friendList?.includes(me?._id) &&
    MenuItems.push({
      label: `Unfriend @${username}`,
      icon: "hand-back-right-off-outline",
      onPress: () => onDeleteFriend(),
    });

  const onViewBio = () => {};

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
  const onDeleteFriend = () => {};

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
    </View>
  );
};

export default OUProfileMenu;
