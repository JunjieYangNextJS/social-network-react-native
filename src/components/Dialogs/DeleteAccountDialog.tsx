import { View } from "react-native";
import React, { useRef, useState } from "react";

import { usePatchArrayMethod } from "../../react-query-hooks/useUser/usePatchUser";

import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useAppTheme } from "../../theme";
import useDeleteAccount, {
  useDeleteGuestAccount,
} from "../../react-query-hooks/useAuth/useDeleteAccount";
import PasswordInput from "../PasswordInput";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import useToastStore from "../../store/useToastStore";
import useUserTokenStore from "../../store/useUserTokenStore";
import { useQueryClient } from "@tanstack/react-query";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { deleteItemAsync } from "expo-secure-store";

interface IDeleteAccountDialog {
  opened: boolean;
  onClose: () => void;
  isGuest: boolean;
}

export default function DeleteAccountDialog({
  opened,
  onClose,
  isGuest,
}: IDeleteAccountDialog) {
  const { colors } = useAppTheme();

  const {
    mutate: deleteGuestAccount,
    isSuccess: guestDeleteIsSuccess,
    isError,
    isPending: guestLoading,
  } = useDeleteGuestAccount();
  const {
    mutate: deleteAccount,
    isPending: userLoading,
    isSuccess: userDeleteIsSuccess,
  } = useDeleteAccount();

  const [password, setPassword] = useState("");

  const { setLogout } = useUserTokenStore();
  const { onOpenToast } = useToastStore();
  const queryClient = useQueryClient();

  const onLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users/logout`);
      if (res.data.status === "success") {
        queryClient.clear();

        await deleteItemAsync("token");

        setLogout();
      }
    } catch (err) {
      onOpenToast("error", "Logout failed");
    }
  };

  //   const important = "extra": {
  //     "eas": {
  //       "projectId": "ff5426f1-cdd6-44a0-ab0e-3a7f852eeabc"
  //     }
  //   },

  //   refs
  const ref_input2 = useRef<any>();

  useDidUpdate(() => {
    if (guestDeleteIsSuccess || userDeleteIsSuccess) {
      onLogout();
    }
  }, [guestDeleteIsSuccess, userDeleteIsSuccess]);

  return (
    <View>
      <Portal>
        <Dialog visible={opened} onDismiss={onClose}>
          {!isGuest ? (
            <>
              <Dialog.Title>Delete your account?</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Nobody will have access to your account or view your personal
                  page. If you regret this decision. please contact us for
                  assistance.
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    marginTop: 20,
                    marginBottom: -10,
                  }}
                >
                  <PasswordInput
                    placeholder="********"
                    defaultStyle={{
                      // marginBottom: 10,
                      borderRadius: 5,
                      fontSize: 17,
                      lineHeight: 20,
                      paddingHorizontal: 13,
                      paddingVertical: 10,
                      backgroundColor: "#141414",
                      color: "white",
                      flex: 1,
                      height: 40,
                    }}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text: string) => setPassword(text)}
                    ref={ref_input2}
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    deleteAccount({ password });
                    onClose();
                  }}
                  disabled={userLoading}
                  textColor={colors.trash}
                >
                  Delete
                </Button>
                <Button onPress={onClose}>Cancel</Button>
              </Dialog.Actions>
            </>
          ) : (
            <>
              <Dialog.Title>Delete your account?</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Nobody will have access to your account or view your personal
                  page. Because this is a guest account, you will not be able to
                  recover it later.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    deleteGuestAccount();
                    onClose();
                  }}
                  disabled={guestLoading}
                  textColor={colors.trash}
                >
                  Delete
                </Button>
                <Button onPress={onClose}>Cancel</Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </Portal>
    </View>
  );
}
