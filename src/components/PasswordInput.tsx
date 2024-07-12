import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  ReturnKeyTypeOptions,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IPasswordInput {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  defaultStyle: any;
  placeholderTextColor: string;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
}

const PasswordInput = React.forwardRef<TextInput, IPasswordInput>(
  (props, ref) => {
    const {
      value,
      onChangeText,
      placeholder,
      defaultStyle,
      placeholderTextColor,
      returnKeyType,
      onSubmitEditing,
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
      <View
        style={{
          flex: 1,
          height: 40,
        }}
      >
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          placeholderTextColor={placeholderTextColor}
          style={[
            defaultStyle,
            { flex: 1, paddingHorizontal: 13, paddingRight: 40 },
          ]}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          ref={ref}
        />
        <Pressable
          onPress={handleShowPassword}
          style={{
            position: "absolute",
            right: 10,
            top: 8,
          }}
        >
          {showPassword ? (
            <Ionicons name="eye-off" size={20} color="gray" />
          ) : (
            <Ionicons name="eye" size={20} color="gray" />
          )}
        </Pressable>
      </View>
    );
  }
);

export default PasswordInput;
