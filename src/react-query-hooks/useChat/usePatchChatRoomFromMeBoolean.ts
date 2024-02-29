import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getItemAsync } from "expo-secure-store";
import { User } from "../../../types";

interface IValues {
    chatRoomId: string;
    boolean: boolean;
    method: "pinned" | 'muted' | 'left'
}

export default function usePatchChatRoomFromMeBoolean() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IValues) => {
      const token = await getItemAsync("token");
    

      return axios.patch(`${baseUrl}/chatRooms/from-me-boolean`, values, {
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