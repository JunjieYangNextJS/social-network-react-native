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
        .catch(err => {
          // console.log(err.response.status)
          // if (err.response.status === 403)
          //   setErrorMessage('Ouch, You have been forbidden to view this page');
          // if (err.response.status === 404) setErrorMessage(404);
          // if (err.response.status === 302) setErrorMessage(302);
       
          return Promise.reject(err.response.data.error.message)
        })
        .then((res) => res.data);
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.token);
      queryClient.setQueryData(["user"], data.data.user);
    },
  });
}
