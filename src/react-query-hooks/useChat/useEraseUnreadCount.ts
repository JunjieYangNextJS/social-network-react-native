import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getItemAsync } from "expo-secure-store";
import { User } from "../../../types";

interface IValues {
    chatRoom: string;
}

export default function useEraseUnreadCount() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IValues) => {
      const token = await getItemAsync("token");
    

      return axios.patch(`${baseUrl}/chatRooms/eraseUnreadCount`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.data.data);
    },
    onSuccess: (data) => {
        queryClient.setQueryData(['user'], (old: User) => {
            const index = old.chatRooms.findIndex(el => el._id === data.id);
  
            let clonedArray = [...old.chatRooms];
  
            clonedArray[index] = data;
  
            return { ...old, chatRooms: clonedArray };
          });
    }
  });
}