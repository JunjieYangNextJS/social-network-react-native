import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider, PaperProvider, Text } from "react-native-paper";
import { setStringAsync } from "expo-clipboard";

interface ICopyTextMenu {
  text: string;
  visible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const CopyTextMenu = ({
  text,
  visible,
  openMenu,
  closeMenu,
}: ICopyTextMenu) => {
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
        anchor={<Text style={{ color: "#222" }}>hmm</Text>}
      >
        <Menu.Item
          onPress={() => setStringAsync(text).then(() => closeMenu())}
          title="Copy"
        />
      </Menu>
    </View>
  );
};

export default CopyTextMenu;
