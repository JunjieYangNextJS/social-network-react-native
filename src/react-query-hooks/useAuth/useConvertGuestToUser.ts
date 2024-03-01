import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import * as SecureStore from "expo-secure-store";

interface IValues {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  birthMonth?: number;
  birthDay?: number;
  birthYear?: number;
}

export default function useConvertGuestToUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IValues) => {
      const token = await SecureStore.getItemAsync("token");
      return axios
        .patch(`${baseUrl}/users/convertGuestToUser`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.token);
      queryClient.setQueryData(["user"], data.data.user);
    },
  });
}
