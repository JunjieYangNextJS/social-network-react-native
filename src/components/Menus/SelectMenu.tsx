import { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, IconButton } from "react-native-paper";
import { SelectArray } from "../../../types";
import { useAppTheme } from "../../theme";

interface ISelectMenu {
  data: SelectArray;
  selectValue: string;
  onSetSelectValue: (value: any) => void;
  icon: string;
  iconSize: number;
  style: Record<string, string | number>;
}

const SelectMenu = ({
  data,
  selectValue,
  onSetSelectValue,
  icon,
  iconSize,
  style,
}: ISelectMenu) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible((prev) => !prev);

  const closeMenu = () => setVisible(false);

  const handlePressItem = (value: string) => {
    onSetSelectValue(value);
    closeMenu();
  };

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
            icon={icon}
            size={iconSize}
            onPress={toggleMenu}
            style={[style && style]}
          />
        }
      >
        {data.map(({ value, label }) => {
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
        })}
      </Menu>
    </View>
  );
};

export default SelectMenu;
