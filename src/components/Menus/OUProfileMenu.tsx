import { useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, IconButton } from "react-native-paper";
import { OtherUser, User } from "../../../types";
import BlockUserDialog from "../Dialogs/BlockUserDialog";

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

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const MenuItems = [
    {
      label: "View complete bio",
      icon: "eye-outline",
      onPress: () => handleViewBio(),
    },
    {
      label: `Report @${username}`,
      icon: "flag-outline",
      onPress: () => handleReport(),
    },
    {
      label: me?.blockedUsers?.includes(id)
        ? `Unblock @${username}`
        : `Block @${username}`,
      icon: "cancel",
      onPress: () => handleBlockUser(),
    },
  ];

  friendList?.includes(me?._id) &&
    MenuItems.push({
      label: `Unfriend @${username}`,
      icon: "hand-back-right-off-outline",
      onPress: () => handleDeleteFriend(),
    });

  const handleViewBio = () => {};
  const handleReport = () => {};
  const handleBlockUser = () => {
    closeMenu();
    setBlockOpened(true);
  };
  const handleDeleteFriend = () => {};

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
      <BlockUserDialog opened={blockOpened} onOpen={handleBlockUser} />
    </View>
  );
};

export default OUProfileMenu;
